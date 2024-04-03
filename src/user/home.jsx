import { useState } from 'react'
import React from 'react'

async function check_auth() {
    try {
    const res = await fetch('http://localhost:3000/api/auth')
    if (res.status != 404) {
        return true
    }
    else {
        return false
    }
    }
    catch (err) {
        return false
    }
}

const allow = await check_auth()

function Home() {
    if (allow) {
        return <p>You passed!</p>
    }
    else {
        return <p>Error, unauthorized.</p>
    }
}

export default Home