import React from 'react'

function User() {
    return (
        <>
            <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                    <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg" width="32" height="32" alt="Marie Zulfikar" />
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">Marie Zulfikar</h4>
                        <div className="text-[13px]">The video chat ended · 2hrs</div>
                    </div>
                </div>
            </button>
        </>
    )
}

export default User