ServiceFxns = {
  getAll : function(result){
    var results = { "links": {},
      "data": [] }
    result.rows.forEach(function(row){
      var memory = {
        "type": "memory",
        "id": row.id,
        "attributes": {
          "old_days": row.old_days,
          "these_days": row.these_days,
          "year": Number(row.year)
        },
        "links": {}
      }
      results.data.push(memory)
    })
    return results
  },

  getYears : function(result){
    var results = {
      "links": {},
      "data": []
    }
    results.data = result.rows
    return results
  },

  getByYear : function(result){
    var results = { "links": {}, "data": [] }
    result.rows.forEach(function(row){
      var memory = {
        "type": "memory",
        "id": row.id,
        "attributes": {
          "old_days": row.old_days,
          "these_days": row.these_days,
          "year": Number(row.year)
        },
        "links": {}
      }
      results.data.push(memory)
    })
    return results
  }
}

module.exports = ServiceFxns