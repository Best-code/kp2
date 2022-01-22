import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { Role } from "@prisma/client";
import { Session } from "next-auth"


const CreateClassForm = () => {

    const [admin, setAdmin] = useState(false)
    const IsAdmin = (Session: Session | null) => {
        if (Session && Session.user) {
            const check = fetch(`/api/admin?email=${Session.user.email}`).then(res => res.json()).then(resData => setAdmin(resData))
        }
        return admin
    }
    const [name, setName] = useState("")
    const [def, setDef] = useState("")
    const [image, setImage] = useState("/chemistry_logo.jpg")
    const { data: session, status } = useSession()

    const HandleSubmit = (e: any) => {
        e.preventDefault();

        /*
        curl --request POST \
        --url 'https://api.sirv.com/v2/files/upload?filename=%2Fpath%2Fto%2Fuploaded-image.jpg' \
        --header 'authorization: Bearer BEARER_TOKEN_HERE' \
        --header 'content-type: image/jpeg'  \
        --data "@/path/to/local-file.jpg"
        
        const [bearer, setBearer] = useState("")
        fetch(`https://api.sirv.com/v2/files/upload?filename=%2Fpath%2Fto%2Fuploaded-image.jpg`, {
            headers: {
                "authorization" : `Bearer ${bearer}}`,
                "content-type" : "image/jpeg"
            },
            body : `${image}`
        })
        */

        fetch(`/api/create/class`, {
            body: JSON.stringify({
                name: name,
                def: def,
                image: image
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })

        router.push(`/class`)
    }

    const router = useRouter();

    return (
        <>
            {IsAdmin(session) && (
                <div>
                    <div className="md:grid md:grid-cols-1 md:gap-6">
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form>
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                                                    Class Name
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        onChange={e => setName(e.target.value)}
                                                        type="text"
                                                        name="class-name"
                                                        id="name"
                                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                        placeholder="Intro to Chemistry"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    onChange={e => setDef(e.target.value)}
                                                    id="def"
                                                    name="description"
                                                    rows={3}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="Description"
                                                    defaultValue={''}
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Brief description for your class.
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                        >
                                                            {/*<span>Upload a file</span>*/}
                                                            <input onChange={e => setImage(e.target.value)} id="image" name="file-upload" type="file" className="" />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            onClick={HandleSubmit}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateClassForm;

export async function getServerSideProps({ req }: any) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false
            }
        }
    }

    console.log(session.user)
    return {
        props: {}
    }

}