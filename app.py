from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime
import os
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = '224b95a9a7dbc5ae43b3afa7abdacb3fc57d7b7427d79eee8cab86329acedad7'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fecesa_admin.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'admin_login'

# Models
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), default='editor')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def get_id(self):
        return str(self.id)
    
    def is_authenticated(self):
        return True
    
    def is_anonymous(self):
        return False

    # THE RECURSIVE @property for is_active HAS BEEN REMOVED.
    # Flask-Login will now correctly use the is_active database column directly.

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.Text)
    image_url = db.Column(db.String(200))
    category = db.Column(db.String(50), default='general')
    status = db.Column(db.String(20), default='draft')
    author_id = db.Column(db.Integer, db.ForeignKey('admin.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    author = db.relationship('Admin', backref='news_articles')

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.Text)
    author_name = db.Column(db.String(100))
    author_role = db.Column(db.String(100))
    author_image = db.Column(db.String(200))
    status = db.Column(db.String(20), default='draft')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(50), default='fas fa-graduation-cap')
    color = db.Column(db.String(20), default='primary')
    level = db.Column(db.String(20), default='undergraduate')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(50), default='fas fa-file')
    color = db.Column(db.String(20), default='primary')
    url = db.Column(db.String(200))
    category = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class StudentMartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    condition = db.Column(db.String(20))
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(200))
    seller_contact = db.Column(db.String(100))
    status = db.Column(db.String(20), default='available')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class SiteSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(50), unique=True, nullable=False)
    value = db.Column(db.Text)
    description = db.Column(db.String(200))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

# Admin required decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or current_user.role not in ['admin', 'editor']:
            flash('Access denied.', 'error')
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function

# --- Public Routes ---
@app.route('/')
def index():
    return render_template('main.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/student-mart')
def student_mart():
    products = StudentMartItem.query.filter_by(status='available').order_by(StudentMartItem.created_at.desc()).all()
    return render_template('student_mart.html', products=products)

@app.route('/dashboard-mart')
def dashboard_mart():
    return render_template('dashboard_mart.html')

@app.route('/programs/<prog>')
def programs(prog):
    program_info = {
        'electrical': {
            'title': 'Electrical Engineering',
            'description': 'Master power systems, electronics, and electrical machines with hands-on training.',
            'duration': '4 years',
            'courses': ['Circuit Analysis', 'Power Systems', 'Electronics', 'Control Systems']
        },
        'computer': {
            'title': 'Computer Engineering', 
            'description': 'Bridge hardware and software with cutting-edge computing technologies.',
            'duration': '4 years',
            'courses': ['Programming', 'Computer Architecture', 'Software Engineering', 'Networks']
        },
        'biomedical': {
            'title': 'Biomedical Engineering',
            'description': 'Combine engineering principles with medical and biological sciences.',
            'duration': '4 years', 
            'courses': ['Biomedical Instrumentation', 'Medical Imaging', 'Biomaterials', 'Physiology']
        },
        'telecom': {
            'title': 'Telecommunications Engineering',
            'description': 'Design and optimize communication networks and systems.',
            'duration': '4 years',
            'courses': ['Signal Processing', 'Wireless Communications', 'Network Security', 'Antenna Design']
        },
        'embedded': {
            'title': 'Embedded Systems',
            'description': 'Specialized program in embedded system design and development.',
            'duration': '2 years (Masters)',
            'courses': ['Real-time Systems', 'Microcontrollers', 'IoT', 'System Design']
        },
        'ai': {
            'title': 'AI & Robotics',
            'description': 'Advanced studies in artificial intelligence and robotic systems.',
            'duration': '2 years (Masters)',
            'courses': ['Machine Learning', 'Computer Vision', 'Robotics', 'Neural Networks']
        }
    }
    program = program_info.get(prog, {
        'title': 'Program Not Found',
        'description': 'The requested program information is not available.',
        'duration': 'N/A',
        'courses': []
    })
    return render_template('programs.html', prog=prog, program=program)

@app.route('/login')
def login():
    return render_template('login.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('500.html'), 500

# --- Admin Routes ---
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        admin = Admin.query.filter_by(username=username).first()
        if admin and check_password_hash(admin.password_hash, password):
            login_user(admin)
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid username or password', 'error')
    return render_template('admin/login.html')

@app.route('/admin/logout')
@login_required
def admin_logout():
    logout_user()
    return redirect(url_for('admin_login'))

@app.route('/admin')
@admin_required
def admin_dashboard():
    stats = {
        'total_news': News.query.count(),
        'published_news': News.query.filter_by(status='published').count(),
        'total_blogs': Blog.query.count(),
        'total_programs': Program.query.count(),
        'total_mart_items': StudentMartItem.query.count(),
        'recent_news': News.query.order_by(News.created_at.desc()).limit(5).all(),
        'recent_blogs': Blog.query.order_by(Blog.created_at.desc()).limit(5).all()
    }
    return render_template('admin/dashboard.html', stats=stats)

# News Management
@app.route('/admin/news')
@admin_required
def admin_news():
    page = request.args.get('page', 1, type=int)
    news_items = News.query.order_by(News.created_at.desc()).paginate(
        page=page, per_page=10, error_out=False)
    return render_template('admin/news/list.html', news_items=news_items)

@app.route('/admin/news/create', methods=['GET', 'POST'])
@admin_required
def admin_news_create():
    if request.method == 'POST':
        news = News(
            title=request.form['title'],
            content=request.form['content'],
            excerpt=request.form['excerpt'],
            image_url=request.form.get('image_url', ''),
            category=request.form['category'],
            status=request.form['status'],
            author_id=current_user.id
        )
        db.session.add(news)
        db.session.commit()
        flash('News article created successfully!', 'success')
        return redirect(url_for('admin_news'))
    return render_template('admin/news/form.html', news=None, action='Create')

@app.route('/admin/news/edit/<int:id>', methods=['GET', 'POST'])
@admin_required
def admin_news_edit(id):
    news = News.query.get_or_404(id)
    if request.method == 'POST':
        news.title = request.form['title']
        news.content = request.form['content']
        news.excerpt = request.form['excerpt']
        news.image_url = request.form.get('image_url', '')
        news.category = request.form['category']
        news.status = request.form['status']
        news.updated_at = datetime.utcnow()
        db.session.commit()
        flash('News article updated successfully!', 'success')
        return redirect(url_for('admin_news'))
    return render_template('admin/news/form.html', news=news, action='Edit')

@app.route('/admin/news/delete/<int:id>')
@admin_required
def admin_news_delete(id):
    news = News.query.get_or_404(id)
    db.session.delete(news)
    db.session.commit()
    flash('News article deleted successfully!', 'success')
    return redirect(url_for('admin_news'))

# Blog Management
@app.route('/admin/blog')
@admin_required
def admin_blog():
    page = request.args.get('page', 1, type=int)
    blog_posts = Blog.query.order_by(Blog.created_at.desc()).paginate(
        page=page, per_page=10, error_out=False)
    return render_template('admin/blog/list.html', blog_posts=blog_posts)

@app.route('/admin/blog/create', methods=['GET', 'POST'])
@admin_required
def admin_blog_create():
    if request.method == 'POST':
        blog = Blog(
            title=request.form['title'],
            content=request.form['content'],
            excerpt=request.form['excerpt'],
            author_name=request.form['author_name'],
            author_role=request.form['author_role'],
            author_image=request.form.get('author_image', ''),
            status=request.form['status']
        )
        db.session.add(blog)
        db.session.commit()
        flash('Blog post created successfully!', 'success')
        return redirect(url_for('admin_blog'))
    return render_template('admin/blog/form.html', blog=None, action='Create')

@app.route('/admin/blog/edit/<int:id>', methods=['GET', 'POST'])
@admin_required
def admin_blog_edit(id):
    blog = Blog.query.get_or_404(id)
    if request.method == 'POST':
        blog.title = request.form['title']
        blog.content = request.form['content']
        blog.excerpt = request.form['excerpt']
        blog.author_name = request.form['author_name']
        blog.author_role = request.form['author_role']
        blog.author_image = request.form.get('author_image', '')
        blog.status = request.form['status']
        blog.updated_at = datetime.utcnow()
        db.session.commit()
        flash('Blog post updated successfully!', 'success')
        return redirect(url_for('admin_blog'))
    return render_template('admin/blog/form.html', blog=blog, action='Edit')

@app.route('/admin/blog/delete/<int:id>')
@admin_required
def admin_blog_delete(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    flash('Blog post deleted successfully!', 'success')
    return redirect(url_for('admin_blog'))

# Program Management
@app.route('/admin/programs')
@admin_required
def admin_programs():
    programs = Program.query.order_by(Program.name).all()
    return render_template('admin/programs/list.html', programs=programs)

@app.route('/admin/programs/create', methods=['GET', 'POST'])
@admin_required
def admin_programs_create():
    if request.method == 'POST':
        program = Program(
            name=request.form['name'],
            code=request.form['code'],
            description=request.form['description'],
            icon=request.form['icon'],
            color=request.form['color'],
            level=request.form['level'],
            is_active=request.form.get('is_active') == 'on'
        )
        db.session.add(program)
        db.session.commit()
        flash('Program created successfully!', 'success')
        return redirect(url_for('admin_programs'))
    return render_template('admin/programs/form.html', program=None, action='Create')

@app.route('/admin/programs/edit/<int:id>', methods=['GET', 'POST'])
@admin_required
def admin_programs_edit(id):
    program = Program.query.get_or_404(id)
    if request.method == 'POST':
        program.name = request.form['name']
        program.code = request.form['code']
        program.description = request.form['description']
        program.icon = request.form['icon']
        program.color = request.form['color']
        program.level = request.form['level']
        program.is_active = request.form.get('is_active') == 'on'
        db.session.commit()
        flash('Program updated successfully!', 'success')
        return redirect(url_for('admin_programs'))
    return render_template('admin/programs/form.html', program=program, action='Edit')

@app.route('/admin/programs/delete/<int:id>')
@admin_required
def admin_programs_delete(id):
    program = Program.query.get_or_404(id)
    db.session.delete(program)
    db.session.commit()
    flash('Program deleted successfully!', 'success')
    return redirect(url_for('admin_programs'))

# Student Mart Management
@app.route('/admin/student-mart')
@admin_required
def admin_student_mart():
    page = request.args.get('page', 1, type=int)
    items = StudentMartItem.query.order_by(StudentMartItem.created_at.desc()).paginate(
        page=page, per_page=10, error_out=False)
    return render_template('admin/mart/list.html', items=items)

@app.route('/admin/student-mart/approve/<int:id>')
@admin_required
def admin_mart_approve(id):
    item = StudentMartItem.query.get_or_404(id)
    item.status = 'available'
    db.session.commit()
    flash('Item approved!', 'success')
    return redirect(url_for('admin_student_mart'))

@app.route('/admin/student-mart/reject/<int:id>')
@admin_required
def admin_mart_reject(id):
    item = StudentMartItem.query.get_or_404(id)
    item.status = 'rejected'
    db.session.commit()
    flash('Item rejected!', 'warning')
    return redirect(url_for('admin_student_mart'))

@app.route('/admin/student-mart/mark-sold/<int:id>')
@admin_required
def admin_mart_mark_sold(id):
    item = StudentMartItem.query.get_or_404(id)
    item.status = 'sold'
    db.session.commit()
    flash('Item marked as sold!', 'success')
    return redirect(url_for('admin_student_mart'))

@app.route('/admin/student-mart/delete/<int:id>')
@admin_required
def admin_mart_delete(id):
    item = StudentMartItem.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    flash('Item deleted successfully!', 'success')
    return redirect(url_for('admin_student_mart'))

# Settings Management
@app.route('/admin/settings', methods=['GET', 'POST'])
@admin_required
def admin_settings():
    if request.method == 'POST':
        for key, value in request.form.items():
            if key.startswith('setting_'):
                setting_key = key.replace('setting_', '')
                setting = SiteSettings.query.filter_by(key=setting_key).first()
                if setting:
                    setting.value = value
                    setting.updated_at = datetime.utcnow()
                else:
                    setting = SiteSettings(key=setting_key, value=value)
                    db.session.add(setting)
        db.session.commit()
        flash('Settings updated successfully!', 'success')
        return redirect(url_for('admin_settings'))
    settings = SiteSettings.query.all()
    settings_dict = {setting.key: setting.value for setting in settings}
    return render_template('admin/settings.html', settings=settings_dict)

# --- API Routes ---
@app.route('/api/news')
def api_news():
    news_items = News.query.filter_by(status='published').order_by(News.created_at.desc()).limit(6).all()
    return jsonify([{
        'id': news.id,
        'title': news.title,
        'excerpt': news.excerpt,
        'image_url': news.image_url,
        'category': news.category,
        'created_at': news.created_at.strftime('%b %d, %Y'),
        'author': news.author.username if news.author else 'Admin'
    } for news in news_items])

@app.route('/api/blog')
def api_blog():
    blog_posts = Blog.query.filter_by(status='published').order_by(Blog.created_at.desc()).limit(6).all()
    return jsonify([{
        'id': blog.id,
        'title': blog.title,
        'excerpt': blog.excerpt,
        'author_name': blog.author_name,
        'author_role': blog.author_role,
        'created_at': blog.created_at.strftime('%b %d, %Y')
    } for blog in blog_posts])

@app.route('/api/programs')
def api_programs():
    programs = Program.query.filter_by(is_active=True).all()
    return jsonify([{
        'id': program.id,
        'name': program.name,
        'code': program.code,
        'description': program.description,
        'icon': program.icon,
        'color': program.color,
        'level': program.level
    } for program in programs])

@app.route('/api/student-mart')
def api_student_mart():
    items = StudentMartItem.query.filter_by(status='available').order_by(StudentMartItem.created_at.desc()).limit(12).all()
    return jsonify([{
        'id': item.id,
        'title': item.title,
        'description': item.description,
        'price': item.price,
        'condition': item.condition,
        'category': item.category,
        'image_url': item.image_url
    } for item in items])

# --- Application Runner ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not Admin.query.first():
            admin = Admin(
                username='admin',
                email='admin@fecesa.edu',
                password_hash=generate_password_hash('admin123'),
                role='admin'
            )
            db.session.add(admin)
            db.session.commit()
            print("Default admin created - username: admin, password: admin123")
    app.run(debug=True)