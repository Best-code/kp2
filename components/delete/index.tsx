import { Dialog, DialogTitle, DialogContent, DialogContentText, Checkbox, DialogActions, FormControlLabel, Button, Alert } from '@mui/material'
import { useState } from 'react'

const Delete = (props : any) => {
    const [check, setCheck] = useState(false)
    const [error, setError] = useState(false)
    const [dialog, setDialog] = useState(false)

    const DeleteError = () => {
        return (
            <Alert severity="warning">You must check the box.</Alert>
        )
    }

    const CheckDelete = () => {
        if(check){
            props.HandleDelete()
        }else{
            setError(true)
        }
    }

    return (
        <div>
            <Dialog open={dialog} onClose={() => setDialog(false)}>
                <DialogTitle>Delete {props.name}</DialogTitle>
                <DialogContent>
                    {error && <DeleteError />}
                    <DialogContentText>
                        Are you sure you would like to continue, this will permanently delete this class and it can not be undone.
                    </DialogContentText>
                    <FormControlLabel
                        label={`I want to delete the class ${props.name}`}
                        control={<Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} />
                        } />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog(false)}>Cancel</Button>
                    <Button onClick={props.HandleDelete}>Proceed</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Delete;