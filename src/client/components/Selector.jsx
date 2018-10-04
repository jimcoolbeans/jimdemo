import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

import { RECORD_TYPES } from '../constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const GET_DNS = gql`
  query DNS($lookup: String!, $recordTypes: [String!]!) {
    getDNS(lookup: $lookup, recordTypes: $recordTypes) {
      name
      type
      TTL
      data
    }
  }
`;

const styles = theme => ({
  root: {
    padding: '20px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    margin: theme.spacing.unit,
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});

class Selector extends React.PureComponent {
  state = {
    recordTypes: [],
    open: false,
    lookup: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    if (event.target.value.length === 0) {
      this.props.onDNSFetched([], false);
    }
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  handleOpen = event => {
    this.setState({ open: true });
  };

  render() {
    const { recordTypes, open, lookup } = this.state;

    const { setLoading, setError, onDNSFetched, classes } = this.props;

    return (
      <ApolloConsumer>
        {client => (
          <Grid container item xs={12} justify="flex-start" alignItems="center">
            <TextField
              required
              id="domain-input"
              label="Domain"
              value={lookup}
              onChange={this.handleChange('lookup')}
              margin="normal"
              className={classes.textField}
              helperText="Enter a domain name"
            />
            <FormControl required className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">Record Types</InputLabel>
              <Select
                multiple
                value={recordTypes}
                onChange={this.handleChange('recordTypes')}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                open={open}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {RECORD_TYPES.map(({ type }) => (
                  <MenuItem key={type} value={type}>
                    <Checkbox checked={recordTypes.indexOf(type) > -1} />
                    <ListItemText primary={type} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select at least one type</FormHelperText>
            </FormControl>
            <Button
              color="primary"
              className={classes.button}
              disabled={!(recordTypes.length && lookup)}
              onClick={async () => {
                setLoading(true);
                try {
                  const { data } = await client.query({
                    query: GET_DNS,
                    variables: { lookup, recordTypes },
                  });

                  onDNSFetched(data.getDNS, true);
                } catch (e) {
                  setError(e.message);
                  setLoading(false);
                }
              }}
            >
              Resolve
            </Button>
          </Grid>
        )}
      </ApolloConsumer>
    );
  }
}

export default withStyles(styles)(Selector);
