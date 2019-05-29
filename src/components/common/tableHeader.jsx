import React, { Component } from "react";
class TableHeader extends Component {
  riaseSort = sortColumn => {
    const _sortColumn = { ...this.props.sortColumn };
    // console.log("checking value", _sortColumn.path);
    if (_sortColumn.path === sortColumn) {
      _sortColumn.order = _sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      _sortColumn.path = sortColumn;
      _sortColumn.order = "asc";
    }
    console.log("_sortColumn", _sortColumn);
    this.props.onSort(_sortColumn);
  };

  renderIcon = column => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" />;
    else return <i className="fa fa-sort-desc" />;
  };
  render() {
    return (
      <thead>
        {this.props.columns.map(column => (
          <th
            style={{ cursor: "pointer" }}
            key={column.path || column.key}
            onClick={() => this.riaseSort(column.path)}
          >
            {column.label}
            {this.renderIcon(column)}
          </th>
        ))}
      </thead>
    );
  }
}

export default TableHeader;
