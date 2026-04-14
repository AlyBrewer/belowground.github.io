from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload/')
def upload():
    return render_template('upload.html')

@app.route('/archive/')
def archive():
    return render_template('archive.html')

@app.route('/directory/')
def directory():
    return render_template('directory.html')

# --- DIRECTORY ROUTES ---
@app.route('/directory/bands/')
def bands():
    return render_template('bands.html')

@app.route('/directory/venues/')
def venues():
    return render_template('venues.html')

@app.route('/directory/crew/')
def crew():
    return render_template('crew.html')

@app.route('/resources/')
def resources():
    return render_template('resources.html')

# --- RESOURCES ROUTES ---
@app.route('/resources/marketing/')
def marketing():
    return render_template('marketing.html')

@app.route('/resources/zines/')
def zines():
    return render_template('zines.html')

@app.route('/resources/venue-guide/')
def venue_guide():
    return render_template('venue_guide.html')

if __name__ == '__main__':
    app.run(debug=True)