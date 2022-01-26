import {useRouter} from "next/router"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogContentText, Checkbox, DialogActions, Button, FormControlLabel, Alert } from '@mui/material'

interface UnitInt {
    link: String
    name: String
    key: number
    isAdmin: boolean
    unitName: string
    unitId: number
}


export const VideoComponent = (props: UnitInt) => {

  const [check, setCheck] = useState(false)
  const [error, setError] = useState(false)

    const router = useRouter()
    const HandleDelete = () => {
        if (check) {
        fetch(`/api/delete/video`, {
            body: JSON.stringify({
                name: props.name,
                unitId: props.unitId
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
              Are you sure you would like to continue, this will permanently delete this video and it can not be undone.
            </DialogContentText>
            <FormControlLabel
              label={`I want to delete the video ${props.name}`}
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

    const DeleteVideo = () => {
        return <div className="flex justify-end items-center">
            <button onClick={() => setDialog(true)}>
                <FontAwesomeIcon className="w-8 h-8 hover:cursor-pointer hover:w-12 hover:h-12" icon={faTrashCan} />
            </button>
        </div>
    }

    return <div className="bg-white flex justify-center items-center w-full">
        <div className="flex p-4 hover:cursor-pointer shadow-lg w-full h-full items-center" key={props.key}>
            <div className="flex text-2xl font-semibold grow hover:text-3xl">
                {props.name}
            </div>
            {props.isAdmin && DeleteVideo()}
            <DialogComponent/>
        </div>
    </div>
}

export default VideoComponent;