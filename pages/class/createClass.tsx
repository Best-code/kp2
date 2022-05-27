import { useState } from "react";
import { getSession } from "next-auth/react"
import { useRouter } from "next/router";
import IsAdmin from "../../helpers/IsAdmin";
import { GetServerSideProps } from "next";
import {LoggedInRedirect, LoggedOutRedirect} from "../../helpers/redirect";

const CreateClassForm = ({ isAdmin }:any) => {
    const [name, setName] = useState("")
    const [def, setDef] = useState("")
    const [image, setImage] = useState("")

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
                name,
                def,
                image
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
            {isAdmin && (
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
                                        </div>

                                        <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                                                    Contentful Entry
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        onChange={e => setImage(e.target.value)}
                                                        type="text"
                                                        name="unit-name"
                                                        id="name"
                                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                        placeholder="Contentful Entry Id"
                                                    />
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

export const getServerSideProps : GetServerSideProps = async (context) => {
    const session = await getSession(context)

    const isAdmin = await IsAdmin(session)
    if(session){
        if(!isAdmin) return LoggedInRedirect("/class")
    }else{
        return LoggedOutRedirect()
    }
    
    return {
        props: { isAdmin }
    }

}