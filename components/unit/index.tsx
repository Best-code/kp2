import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Checkbox, DialogActions, Button, FormControlLabel, Alert } from '@mui/material'

interface UnitInt {
    class: Class
    name: String
    key: number
    isAdmin: boolean
}

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Class } from "@prisma/client";
import Link from "next/link"
import { useRouter } from "next/router";

export const UnitComponent = (props: UnitInt) => {

    const [check, setCheck] = useState(false)
    const [error, setError] = useState(false)

    const router = useRouter()
    const HandleDelete = () => {
        if (check) {
            fetch(`/api/delete/unit`, {
                body: JSON.stringify({
                    name: props.name,
                    classId: props.class.id
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            })
            router.reload()
        } else {
            setError(true)
        }
    }
      const DeleteError = () => {
    return (
      <Alert severity="warning">You must check the box.</Alert>
    )
  }

  const [dialog, setDialog] = useState(false)
  const DialogComponent = () => {
    return (
      <div>
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>Delete {props.name}</DialogTitle>
          <DialogContent>
            {error && <DeleteError />}
            <DialogContentText>
              Are you sure you would like to continue, this will permanently delete this unit and it can not be undone.
            </DialogContentText>
            <FormControlLabel
              label={`I want to delete the unit ${props.name}`}
              control={<Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} />
              } />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
                setDialog(false)
                 setError(false)
                 setCheck(false)
                 }
                 }>Cancel</Button>
            <Button onClick={HandleDelete}>Proceed</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

    const DeleteUnit = () => {
        return <div className="flex justify-end items-center">
            <button onClick={() => setDialog(true)}>
                <FontAwesomeIcon className="w-8 h-8 hover:cursor-pointer hover:w-12 hover:h-12" icon={faTrashCan} />
            </button>
        </div>
    }


    return <div className="pb-2 bg-white">
            <div className="flex p-4 items-center justify-left hover:cursor-pointer h-16 shadow-lg w-full" key={props.key}>
        <Link href={`/class/${props.class.name}/${props.name}`}>
                <div className="flex text-2xl font-semibold grow hover:text-3xl">
                    {props.name}
                </div>
        </Link>
                    {props.isAdmin && DeleteUnit()}
                    <DialogComponent/>
            </div>
    </div>
}

export default UnitComponent;