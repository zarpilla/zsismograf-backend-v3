const config = {
  filterable: true,
  sortable: false,
  dataSource: {     
      //data: pivotedProjects,
      columns: [ { name: "project_state", expand: false }, { name: "leader", expand: false }, { name: "project_scope", expand: false }, { name: "year", expand: false }, { name: "month", expand: false }, { name: "day", expand: false }, { name: "username", expand: false } ], // Specify a dimension on columns.
      rows: [ { name: "date", expand: false }, { name: "name", expand: false }], // Specify a dimension on rows.            
      measures: ["Hores reals", "Hores previstes"],
      schema: {
          model: {
              fields: {
                project_state: { type: "string" },
                leader: { type: "string" },
                name: { type: "string" },
                project_scope: { type: "string" },
                username: { type: "string" },                        
                year: { type: "number" },
                month: { type: "number" },                        
                day: { type: "number" },
                date: { type: "straing" },                          
                    // , format: "{0: dd-MM-yy}"
              }
          },
          cube: {
              dimensions: {
                  project_state: { caption: "Estats (TOTS)" },
                  leader: { caption: "Líders (TOTS)" },
                  name: { caption: "Projectes (TOTS)" },
                  project_scope: { caption: "Àmbits (TOTS)" },
                  month: { caption: "Mesos (TOTS)" },
                  year: { caption: "Anys (TOTS)" },
                  day: { caption: "Dies (TOTS)" },
                  date: { caption: "Data (TOTES)" },
                  username: { caption: "Persones (TOTES)" },
                  
                  
              },
              //measures: ["Sum"]
              measures: {
                  "Num": { 
                    field: "count", 
                    aggregate: "sum",                            
                  }, 
                  "Hores reals": { 
                      field: "hours", 
                      aggregate: "sum",                            
                  },
                  "Hores previstes": { 
                    field: "estimated_hours", 
                    aggregate: "sum",
                  },
                  "Total Hores previstes": { 
                    field: "total_estimated_hours", 
                    aggregate: "sum",
                  },
                  "Total Hores reals": { 
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