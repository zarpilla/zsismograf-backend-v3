let config = {
    filterable: true,
    sortable: false,
    dataSource: {     
        //data: pivotedProjects,
        columns: [ { name: "name", expand: false } ], // Specify a dimension on columns.
        rows: [ { name: "entity", expand: false } ], // Specify a dimension on rows.            
        measures: ["Num"],
        schema: {
            model: {
                fields: {
                  project_state: { type: "string" },
                  leader: { type: "string" },
                  name: { type: "string" },
                  project_scope: { type: "string" },
                  entity: { type: "string" },
                  //strategy_name: { type: "string" },
                    // , format: "{0: dd-MM-yy}"
                }
            },
            cube: {
                dimensions: {
                    project_state: { caption: "Estats (TOTS)" },
                    leader: { caption: "Líders (TOTS)" },
                    name: { caption: "Projectes (TOTS)" },
                    project_scope: { caption: "Àmbits (TOTS)" },
                    entity: { caption: "Entitats (TOTES)" },
                    //strategy_name: { caption: "Estratègies (TOTES)" },
                    
                },
                //measures: ["Sum"]
                measures: {
                    "Num": { 
                      field: "count", 
                      aggregate: "sum",                            
                    }, 
                    "Balanç (€)": { 
                        field: "incomes_expenses", 
                        aggregate: "sum",                            
                    },
                    "estimated_balance": { 
                      field: "estimated_balance", 
                      aggregate: "sum",
                    },
                    "Hores previstes": { 
                      field: "total_estimated_hours", 
                      aggregate: "sum",
                    },
                    "Hores reals": { 
                      field: "total_real_hours", 
                      aggregate: "sum",
                    },
                }
            }
        },
        pageSize: 10000,
        // schema: {
        //     model: {
        //         fields: {
        //             commission: { type: "number" }                    
        //         }
        //     }
        // },
    },
    height: '74vh',
}

export default config;