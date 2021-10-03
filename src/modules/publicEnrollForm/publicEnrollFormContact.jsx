export default function PublicEnrollFormContact({ isLoggedIn, updateUserInfo }) {

    const handleInputUpdate = (event) => {
        const target = event.target;
        const name = target.name;
        updateUserInfo((prevInfo) => {
            return {
                ...prevInfo,
                [name]: target.value
            }
        });
    }

    return (
        <>
            {
                !isLoggedIn && (
                    <>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                姓名 *
                            </label>
                            <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" name="name" onBlur={handleInputUpdate} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                電話號碼 *
                            </label>
                            <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="phone" name="phone" onBlur={handleInputUpdate} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                電郵地址 *
                            </label>
                            <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="email" name="email" onBlur={handleInputUpdate} required />
                        </div>
                    </>
                )
            }
        </>
    )
}