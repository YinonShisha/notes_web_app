import * as jwt from 'async-jsonwebtoken'
import mysql from 'mysql2/promise'
import { createContext } from 'react'
function getNewKey() {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}
async function createTextNote(text) {
    const db = await mysql.createConnection(process.env.DATABASE_URL)
    // check if the key are exist
    let key_exist = true
    let key = getNewKey()
    while (key_exist) {
    
        const [rows, fields] = await db.execute('SELECT json FROM data WHERE ID=?', [key])
        if (!rows.length) {
            key_exist = false
        }
        key = getNewKey()
    }
    const jsonText = JSON.stringify({type:'text', data: text})
    const [rows, fields] = await db.execute('INSERT INTO data (ID, json) VALUES (?, ?);', [key, jsonText])
    await db.end()
    const [token, err] = await jwt.sign({sub:key}, process.env.SECRET_JSON_WEB_TOKEN)
    return {token}
}

export default async function (req, res) {
    let isPost = false
    let text = ''
    if (req.method === 'POST') {
        isPost = true
        if (req.body && req.body.data) {
            text = req.body.data
        }
    }
    let r = await createTextNote(text)
    if (isPost) {
        res.status(200).json(r)
    }
    else {
        res.redirect('/edit/' + r.token)
    }

}
  