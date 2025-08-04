from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash, get_flashed_messages
import json, os

app = Flask(__name__)
app.secret_key = 'qwerty'

USERS_FILE = 'users.json'

def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, 'r') as f:
        try:
            data = json.load(f)
            return data if isinstance(data, dict) else {}
        except json.JSONDecodeError:
            return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4, ensure_ascii=False)

@app.route('/', methods=['GET', 'POST'])
def login_register():
    error = None
    success = None

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        action = request.form['action']
        users = load_users()

        if action == 'register':
            if username in users:
                error = "Имя пользователя уже существует"
            else:
                users[username] = {
                    'password': password,
                    'hits_easy': 0, 'misses_easy': 0,
                    'hits_medium': 0, 'misses_medium': 0,
                    'hits_hard': 0, 'misses_hard': 0
                }
                save_users(users)
                success = f"Пользователь {username} успешно зарегистрирован!"

        elif action == 'login':
            if username in users and users[username]['password'] == password:
                session['username'] = username
                return redirect(url_for('start'))
            else:
                error = "Неверное имя пользователя или пароль"

    return render_template('register.html', error=error, success=success)


@app.route('/start')
def start():
    messages = get_flashed_messages()
    return render_template('start.html', messages=messages)


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/save_score', methods=['POST'])
def save_score():
    data = request.json
    username = data.get('username')

    with open('users.json', 'r') as f:
        users = json.load(f)

    user = users.get(username)
    if user:
        for key in data:
            if key.startswith("hits_") or key.startswith("misses_"):
                user[key] = data[key]

        with open('users.json', 'w') as f:
            json.dump(users, f, indent=4)

        return jsonify({"status": "ok"})
    return jsonify({"status": "user not found"}), 404

@app.route('/leaderboard')
def leaderboard():
    users_data = load_users()
    leaderboard_data = []

    for username, info in users_data.items():
        leaderboard_data.append({
            'name': username,
            'easy': info.get('hits_easy', 0),
            'medium': info.get('hits_medium', 0),
            'hard': info.get('hits_hard', 0)
        })

    
    leaderboard_data.sort(key=lambda u: u['easy'] + u['medium'] + u['hard'], reverse=True)

    return render_template('leaderboard.html', users=leaderboard_data)



if __name__ == '__main__':
    app.run(debug=True)
