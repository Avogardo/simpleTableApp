import React, { PropTypes } from 'react';
import {
  FlatButton,
  Dialog,
  TextField,
  DatePicker,
  Snackbar,
  CardText,
} from 'material-ui';


class UpdateDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      dateFrom: new Date(),
      dateTo: new Date(),
      openSnackBar: false,
      errorMessage: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      id,
      addNewRow,
      onClose,
      onUpdate,
    } = this.props;

    const {
      name,
      surname,
      dateFrom,
      dateTo,
    } = this.state;

    onUpdate(id, name, surname, dateFrom, dateTo);

    this.setState({
      errorMessage: '',
      openSnackBar: true,
    });
    onClose();
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeSurname(e) {
    this.setState({
      surname: e.target.value,
    });
  }

  onChangeDateFrom(nullValue, date) {
    this.setState({
      dateFrom: date,
    });
  }

  onChangeDateTo(nullValue, date) {
    this.setState({
      dateTo: date,
    });
  }

  render() {
    const {
      open,
      onClose,
    } = this.props;

    const {
      errorMessage,
      openSnackBar,
    } = this.state;

    const actions = [
        <FlatButton
          label="Cancel"
          onTouchTap={onClose}
        />,
        <FlatButton
          label="Update"
          primary
          onTouchTap={e => this.onSubmit(e)}
        />,
    ];

    return ( <div>
        <Dialog
          title="Update row"
          actions={actions}
          open={open}
        >
          <TextField
            hintText="Name"
            onChange={e => this.onChangeName(e)}
          />
          <TextField
            hintText="Surname"
            onChange={e => this.onChangeSurname(e)}
          />
          <DatePicker
            hintText="Date from"
            container="inline"
            mode="landscape"
            onChange={(nullValue, e) => this.onChangeDateFrom(nullValue, e)}
          />
          <DatePicker
            hintText="Date to"
            container="inline"
            mode="landscape"
            onChange={(nullValue, e) => this.onChangeDateTo(nullValue, e)}
          />
          {errorMessage ?
            <CardText
              color="red"
            >
              {errorMessage}
            </CardText>
            :
            ''
          }
        </Dialog>

        <Snackbar
          open={openSnackBar}
          message="Row has been updated!"
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

UpdateDialog.defaultProps = {
  open: false,
};

UpdateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default UpdateDialog;