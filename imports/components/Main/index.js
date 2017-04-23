import { Meteor } from 'meteor/meteor';
import { FullPageLoader } from '/imports/components/Loaders';
import { compose } from 'react-komposer';

import {
  TableData,
  actions as tableActions
} from '/imports/api/tableData';

import Main from './Main.jsx';


const composer = (props, onData) => {
    onData(null, {
      addNewRow: tableActions.addNewRow,
      TableData,
    });
};

export default compose(
  composer,
  FullPageLoader,
)(Main);
