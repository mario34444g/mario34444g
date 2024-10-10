from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Ruta para la página de inicio de sesión
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Autenticación básica (usuario: usuario123, contraseña: 1234)
        if username == 'usuario123' and password == '1234':
            return redirect(url_for('principal', username=username))
        else:
            return "Usuario o contraseña incorrectos. <a href='/'>Intentar de nuevo</a>"
    return render_template('index.html')

# Ruta para la página principal después del inicio de sesión
@app.route('/principal/<username>')
def principal(username):
    return render_template('principal.html', username=username)

if __name__ == '__main__':
    app.run(debug=True)
