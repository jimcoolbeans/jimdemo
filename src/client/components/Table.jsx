import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    position: 'relative',
  },
  table: {
    minWidth: 700,
  },
  loading: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  loadingWrapper: {
    position: 'absolute',
    background: 'rgba(128,128,128,.4)',
    top: '0px',
    bottom: '0px',
    width: '100%',
    textAlign: 'center',
    paddingTop: '60px',
  },
});

const DnsTable = (props) => {
  const {
    classes, loading, records, hasQuery,
  } = props;

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Type ID</TableCell>
              <TableCell>TTL</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length > 0 ? (
              records.map(row => (
                <TableRow>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.typeName}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.TTL}</TableCell>
                  <TableCell>{row.data}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>{hasQuery ? 'No Results For Query' : ' '}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {loading && (
          <div className={classes.loadingWrapper}>
            <Typography variant="title" className={classes.loading}>
              LOADING
            </Typography>
          </div>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(DnsTable);
