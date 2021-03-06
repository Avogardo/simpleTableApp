import React, { PropTypes } from 'react';

import {
  Snackbar,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui';

import Row from './Row.jsx';
import UpdateDialog from './UpdateDialog.jsx';

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.showRemoveErrorSnackbar = this.showRemoveErrorSnackbar.bind(this);
    this.showRemoveSuccessSnackbar = this.showRemoveSuccessSnackbar.bind(this);
    this.showUpdateRowDialog = this.showUpdateRowDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      openErrorSnackBar: false,
      openSuccessSnackBar: false,
      errorMessage: '',
      showUpdateRowDialog: false,
      rowId: '',
      row: {},
    };
  }

  showRemoveErrorSnackbar(err) {
    this.setState({
      openErrorSnackBar: true,
      errorMessage: err.reason,
    });
  }

  showRemoveSuccessSnackbar() {
    this.setState({
      openSuccessSnackBar: true,
      errorMessage: '',
    });
  }

  showUpdateRowDialog(e, id) {
    const {
      rows,
    } = this.props;

    const row = rows.find(thisRow =>
      thisRow._id === id,
    );

    this.setState({
      showUpdateRowDialog: true,
      rowId: id,
      row,
    });
  }

  hideDialog() {
    this.setState({ showUpdateRowDialog: false });
  }

  handleRequestClose() {
    this.setState({
      openSuccessSnackBar: false,
      openErrorSnackBar: false,
    });
  }

  render() {
    const {
      deleteRow,
      rows,
      updateThisRow,
      updateError,
      FullPageLoader,
    } = this.props;

    const { errorMessage,
      showUpdateRowDialog,
      openErrorSnackBar,
      openSuccessSnackBar,
      row,
    } = this.state;


    return (<div>
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Surname</TableHeaderColumn>
            <TableHeaderColumn>Date from</TableHeaderColumn>
            <TableHeaderColumn>Date to</TableHeaderColumn>
            <TableHeaderColumn>Action</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {rows ? rows.map(thisRow =>
            <Row
              key={thisRow._id}
              id={thisRow._id}
              name={thisRow.name}
              surname={thisRow.surname}
              dateFrom={thisRow.dateFrom}
              dateTo={thisRow.dateTo}
              deleteRow={deleteRow}
              showRemoveErrorSnackbar={this.showRemoveErrorSnackbar}
              showRemoveSuccessSnackbar={this.showRemoveSuccessSnackbar}
              updateRow={this.showUpdateRowDialog}
            />,
            ) : FullPageLoader()
          }
        </TableBody>
      </Table>

      <Snackbar
        open={openErrorSnackBar}
        message={errorMessage}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />

      <Snackbar
        open={openSuccessSnackBar}
        message="Row has been removed successfuly"
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />

      <UpdateDialog
        open={showUpdateRowDialog}
        onClose={this.hideDialog}
        updateThisRow={updateThisRow}
        updateError={updateError}
        row={row}
      />
    </div>
    )
  }
};

SimpleTable.propTypes = {
  deleteRow: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  updateThisRow: PropTypes.func.isRequired,
  FullPageLoader: PropTypes.func.isRequired,
  updateError: PropTypes.func,
};

export default SimpleTable;
