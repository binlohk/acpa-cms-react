import { Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import axios from 'axios';
import { storeUser, storeToken, getUser } from '../../services/authService';
import { useState } from 'react';

export default function PublicEnrollFormLoginDialog({ isShowLoginDialog, showLoginDialog, login }) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = () => {
        console.log(username)
        console.log(password)
        axios.post(
            `${process.env.REACT_APP_BACKEND_SERVER ?? "http://localhost:1337"}/auth/local`,
            {
                // identifier: "abcbinlo@gmail.com",
                // password: "12345678",
                identifier: username,
                password: password,
            }
        ).then((response) => {
            storeUser(response.data.user);
            storeToken(response.data.jwt);
            login(getUser())
            showLoginDialog(false)
        })
    }

    return (
        <Dialog
            open={isShowLoginDialog}
        >
            <DialogTitle id="alert-dialog-title">歡迎回來</DialogTitle>
            <DialogContent>
                <div class="grid grid-cols-1 gap-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            電郵
                        </label>
                        <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            密碼
                        </label>
                        <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="password" onChange={ (e) => setPassword(e.target.value) } />
                    </div>
                    <DialogActions>
                        <button className="bg-indigo-700 text-white rounded-md py-2 px-4" onClick={handleLogin}>登入</button>
                        <button className="rounded-md py-2 px-4" onClick={() => { showLoginDialog(false) }}>取消</button>
                    </DialogActions>

                </div>
            </DialogContent>
        </Dialog>
    )
}