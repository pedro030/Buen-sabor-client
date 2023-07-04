const Change_password = () => {
    return (
        <>
            <h2 className='mb-5 text-center stat-title'>Change password</h2>
            <div className="flex justify-center">
                <div className="grid grid-rows-4 gap-5 w-[40%]">
                    <div className="flex flex-col ">
                        <label className="label">
                            <span className="label-text">old password</span>
                        </label>
                        <input type="text" className="w-full input input-bordered" />
                    </div>
                    <div className="flex flex-col ">
                        <label className="label">
                            <span className="label-text">new password</span>
                        </label>
                        <input type="text" className="w-full input input-bordered" />
                    </div>
                    <div className="flex flex-col ">
                        <label className="label">
                            <span className="label-text">repeat password</span>
                        </label>
                        <input type="text" className="w-full input input-bordered" />
                    </div>
                    <button className="rounded-full btn btn-primary">Save changes</button>
                </div>
            </div>
        </>
    )
}

export default Change_password