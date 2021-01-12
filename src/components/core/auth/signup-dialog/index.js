import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../../../store/actions';

const SignupDialog = () => {
    const open = useSelector(state => state.modal.signupDialog);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });
    console.log('open', open)
    const handleLogin = () => {
        dispatch(allActions.user.fetchSignUp(state));
    };

    const onChange = (name) => (event) => {
        console.log('event', event, name)
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    const handleClose = () => {
        dispatch(allActions.modal.closeSignUp());
    };

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="test"
                    fullWidth
                    onChange={onChange('name')}
                    value={state.name}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    onChange={onChange('email')}
                    value={state.email}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={onChange('password')}
                    value={state.password}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleLogin} color="primary">
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SignupDialog;