commit: 5fe1289fbe9cf1834de72789f6629e5f23184974 (HEAD -> master)
Author: sekretsawwse
Date:   Thu Mar 06 09:42:02 2025 -0600

    Implement account recovery mechanism and tweak login code

diff --git a/index.js b/index.js
 app.post('/api/login', (req, res) => {
     let { username, password, action } = req.body
         let user = db.prepare(`SELECT username, password FROM users WHERE username = '${username}';`).get()
         if (action == 'recover') {
             res.cookie('recover_username', user.username)
             res.redirect("/recover.html")
             return
         }

         let token = getAuthJwt(user.username)
         res.cookie('auth', token)
         res.redirect('/dashboard.html')
 app.post('/api/recover', (req, res) => {
     let { recovery_token } = req.body

     let user = db.prepare(`SELECT * FROM users WHERE recovery_token = ?;`).get(recovery_token)

     if (!user) {
         res.cookie('error', 'Invalid recovery token')
         res.redirect(req.get("Referrer") || "/")
         return
     }

     let token = getAuthJwt(user.username)
     res.cookie('auth', token)
     res.redirect('/dashboard.html')

 });