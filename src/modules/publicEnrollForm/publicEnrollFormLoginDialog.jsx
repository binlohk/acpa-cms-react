import { Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

export default function PublicEnrollFormLoginDialog({ isShowLoginDialog, showLoginDialog, storeUser }) {

    const handleLogin = () => {
        alert("loggedin!")
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
                        <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            密碼
                        </label>
                        <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="password" />
                    </div>
                    <DialogActions>
                        <button className="bg-indigo-700 text-white rounded-md py-2 px-4" onClick={ handleLogin }>登入</button>
                        <button className="rounded-md py-2 px-4" onClick={() => { showLoginDialog(false) }}>取消</button>
                    </DialogActions>

                </div>
            </DialogContent>
        </Dialog>
    )
}