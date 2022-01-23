import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import IsAdmin from "../../../helpers/IsAdmin";
import { serverRoute } from "../../../config";

const CreateUnitForm = ({ isAdmin, classInfo } :any) => {
    const [name, setName] = useState("")

    const router = useRouter();

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`/api/create/unit`, {
            body: JSON.stringify({
                name,
                classId: classInfo.id,
                handouts: {},
                videos: {}
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })

        router.push(`/class/${classInfo.name}`)
    }

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
                                                    Unit Name
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        onChange={e => setName(e.target.value)}
                                                        type="text"
                                                        name="unit-name"
                                                        id="name"
                                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                        placeholder="Unit One"
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateUnitForm;

export const getServerSideProps : GetServerSideProps = async (context) => {
    const session = await getSession(context)

    const {className} = context.query
    const classInfoRes = await fetch(`${serverRoute}/api/classes/class?name=${className}`)
    const classInfo = await classInfoRes.json()
    console.log(classInfo)
    const isAdmin = await IsAdmin(session)
    if (!isAdmin) {
        return {
            redirect: {
                destination: `/class/${className}`,
                permanent: false
            }
        }
    }
    
    return {
        props: { isAdmin, classInfo }
    }

}