import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Table from './components/Table';
import Selector from './components/Selector';

const styles = () => ({
  root: {
    padding: '20px',
  },
});

class App extends React.PureComponent {
  state = {
    records: [],
    loading: false,
    hasQuery: false,
  };

  setLoading = bool => {
    this.setState({ loading: bool });
  };

  setError = e => {
    this.setState({
      error: e,
    });
  };

  onDNSFetched = (records, hasQuery) => {
    this.setState({ records, hasQuery, loading: false });
  };

  render() {
    const { loading, records, error, hasQuery } = this.state;

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={15}>
          <Selector
            setLoading={this.setLoading}
            setError={this.setError}
            onDNSFetched={this.onDNSFetched}
          />
          {error && (
            <Grid item xs={12}>
              <div>{error}</div>
            </Grid>
          )}
          <Grid item xs={12}>
            <Table records={records} loading={loading} hasQuery={hasQuery} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
