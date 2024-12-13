import flask
import flask_cors
from controller import controller_bp

app = flask.Flask(__name__)
flask_cors.CORS(app, resources={
    r"/*":
        {
            "origins": ["*"],
            "methods": ["GET", "POST"]
        }
})


app.register_blueprint(controller_bp, url_prefix="/searches")
app.run()