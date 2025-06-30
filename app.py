from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
import json
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Database configuration
DATABASE_URL = os.getenv('DATABASE_URL')

def get_db_connection():
    """Get database connection"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def init_database():
    """Initialize database tables"""
    conn = get_db_connection()
    if conn:
        try:
            cur = conn.cursor()
            
            # Create supporters table for tracking donations
            cur.execute('''
                CREATE TABLE IF NOT EXISTS supporters (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    email VARCHAR(255),
                    amount DECIMAL(10,2) NOT NULL,
                    message TEXT,
                    supported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    anonymous BOOLEAN DEFAULT FALSE
                )
            ''')
            
            # Create contact_submissions table for contact form
            cur.execute('''
                CREATE TABLE IF NOT EXISTS contact_submissions (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    subject VARCHAR(255),
                    message TEXT NOT NULL,
                    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    status VARCHAR(50) DEFAULT 'new'
                )
            ''')
            
            # Create testimonials table
            cur.execute('''
                CREATE TABLE IF NOT EXISTS testimonials (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    role VARCHAR(255),
                    message TEXT NOT NULL,
                    approved BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Create newsletter_subscribers table
            cur.execute('''
                CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    active BOOLEAN DEFAULT TRUE
                )
            ''')
            
            conn.commit()
            cur.close()
            conn.close()
            print("Database tables initialized successfully")
            
        except Exception as e:
            print(f"Database initialization error: {e}")
            conn.rollback()
            conn.close()

# Routes

@app.route('/')
def index():
    """Serve the main index.html"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    """Serve static files"""
    return send_from_directory('.', path)

@app.route('/api/supporters', methods=['POST'])
def add_supporter():
    """Add new supporter/donation"""
    try:
        data = request.get_json()
        name = data.get('name', '')
        email = data.get('email', '')
        amount = data.get('amount')
        message = data.get('message', '')
        anonymous = data.get('anonymous', False)
        
        if not amount:
            return jsonify({'error': 'Amount is required'}), 400
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cur = conn.cursor()
        
        # Insert new supporter
        cur.execute(
            'INSERT INTO supporters (name, email, amount, message, anonymous) VALUES (%s, %s, %s, %s, %s) RETURNING id',
            (name if not anonymous else None, email if not anonymous else None, amount, message, anonymous)
        )
        result = cur.fetchone()
        if not result:
            raise Exception("Failed to record support")
        supporter_id = result[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your support!',
            'supporter_id': supporter_id
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to process support: {str(e)}'}), 500

@app.route('/api/newsletter/subscribe', methods=['POST'])
def newsletter_subscribe():
    """Subscribe to newsletter"""
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cur = conn.cursor()
        
        # Insert new subscriber
        cur.execute(
            'INSERT INTO newsletter_subscribers (email) VALUES (%s) ON CONFLICT (email) DO UPDATE SET active = TRUE RETURNING id',
            (email,)
        )
        result = cur.fetchone()
        if not result:
            raise Exception("Failed to subscribe")
        subscriber_id = result[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Successfully subscribed to newsletter!',
            'subscriber_id': subscriber_id
        })
        
    except Exception as e:
        return jsonify({'error': f'Subscription failed: {str(e)}'}), 500

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submission"""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        company = data.get('company', '')
        message = data.get('message')
        
        if not all([name, email, message]):
            return jsonify({'error': 'Name, email, and message are required'}), 400
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cur = conn.cursor()
        
        # Insert contact submission
        cur.execute(
            'INSERT INTO contact_submissions (name, email, company, message) VALUES (%s, %s, %s, %s) RETURNING id',
            (name, email, company, message)
        )
        result = cur.fetchone()
        if not result:
            raise Exception("Failed to create contact submission")
        submission_id = result[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Contact form submitted successfully',
            'submission_id': submission_id
        })
        
    except Exception as e:
        return jsonify({'error': f'Submission failed: {str(e)}'}), 500

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get service metrics for dashboard"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cur = conn.cursor()
        
        # Get latest metrics
        cur.execute('''
            SELECT metric_name, metric_value, unit, recorded_at 
            FROM service_metrics 
            ORDER BY recorded_at DESC 
            LIMIT 10
        ''')
        metrics = cur.fetchall()
        
        # Get total support amount
        cur.execute('SELECT COALESCE(SUM(amount), 0) FROM supporters')
        support_result = cur.fetchone()
        total_support = float(support_result[0]) if support_result else 0
        
        # Get supporter count
        cur.execute('SELECT COUNT(*) FROM supporters')
        supporter_result = cur.fetchone()
        supporter_count = supporter_result[0] if supporter_result else 0
        
        # Get contact submissions count
        cur.execute('SELECT COUNT(*) FROM contact_submissions WHERE status = %s', ('new',))
        contact_result = cur.fetchone()
        contact_count = contact_result[0] if contact_result else 0
        
        cur.close()
        conn.close()
        
        metrics_data = []
        for metric in metrics:
            metrics_data.append({
                'name': metric[0],
                'value': float(metric[1]),
                'unit': metric[2],
                'recorded_at': metric[3].isoformat() if metric[3] else None
            })
        
        return jsonify({
            'success': True,
            'metrics': metrics_data,
            'summary': {
                'total_support': total_support,
                'supporter_count': supporter_count,
                'new_contacts': contact_count
            }
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to fetch metrics: {str(e)}'}), 500

@app.route('/api/metrics', methods=['POST'])
def add_metric():
    """Add new service metric"""
    try:
        data = request.get_json()
        metric_name = data.get('metric_name')
        metric_value = data.get('metric_value')
        unit = data.get('unit', '')
        
        if not metric_name or metric_value is None:
            return jsonify({'error': 'Metric name and value are required'}), 400
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cur = conn.cursor()
        
        # Insert metric
        cur.execute(
            'INSERT INTO service_metrics (metric_name, metric_value, unit) VALUES (%s, %s, %s) RETURNING id',
            (metric_name, metric_value, unit)
        )
        result = cur.fetchone()
        if not result:
            raise Exception("Failed to create metric")
        metric_id = result[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Metric added successfully',
            'metric_id': metric_id
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to add metric: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        conn = get_db_connection()
        if conn:
            cur = conn.cursor()
            cur.execute('SELECT 1')
            cur.close()
            conn.close()
            
            return jsonify({
                'status': 'healthy',
                'database': 'connected',
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({
                'status': 'unhealthy',
                'database': 'disconnected',
                'timestamp': datetime.now().isoformat()
            }), 500
            
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    # Initialize database on startup
    init_database()
    
    # Run the app
    app.run(host='0.0.0.0', port=5000, debug=True)