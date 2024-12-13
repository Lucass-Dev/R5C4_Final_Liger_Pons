import flask
import flask_cors


app = flask.Flask(__name__)
flask_cors.CORS(app, resources={
    r"/*":
        {
            "origins": ["*"],
            "methods": ["GET", "POST"]
        }
})

@app.route('/')
def home():
    return {"message": "Hello World"}, 200

app.run()