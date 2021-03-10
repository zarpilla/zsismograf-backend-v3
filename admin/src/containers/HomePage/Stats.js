import React, { Component } from "react";
import eventBus from "./EventBus";
import { auth } from 'strapi-helper-plugin';
import axios from 'axios';
import moment from 'moment';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      projects: [],
      isLoadingProjects: false,
      error: null
    };
  }

  componentDidMount() {
      
    eventBus.on("showStats", async (data) => {
        
        this.setState({ message: data.message })

        console.log('moment', moment)

        let addScript = async (src) => {
          return new Promise((resolve, reject) => {
              let head = document.head || document.getElementsByTagName('head')[0];
              let script = document.createElement('script');
              script.src = src;
              script.addEventListener('load', resolve);
              script.addEventListener('error', () => reject('Error loading script ' + src));
              script.addEventListener('abort', () => reject('Error loading script (aborting) ' + src));
              head.appendChild(script);
          });
        }

        let addStyle = async (src) => {
          return new Promise((resolve, reject) => {
              let head = document.head || document.getElementsByTagName('head')[0];
              let link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = src;
              link.addEventListener('load', resolve);
              link.addEventListener('error', () => reject('Error loading script'));
              link.addEventListener('abort', () => reject('Error loading script (aborting)'));
              head.appendChild(link);
          });
        }
      
        

        await addScript(`${strapi.backendURL}/uploads/jquery_70379cbcd5.js`)
        await addScript(`${strapi.backendURL}/uploads/kendo_all_min_079022c1df.js`)      
        await addStyle(`${strapi.backendURL}/uploads/kendo_common_min_1c8f47c042.css`)
        await addStyle(`${strapi.backendURL}/uploads/kendo_custom_c9e7ec10c4.css`)
        await addStyle(`${strapi.backendURL}/uploads/custom_e96339c3f0.css`)


        
        
        const token = auth.getToken()
        const headers = { headers: {'Authorization': 'Bearer ' + token }};
        const url = `${strapi.backendURL}/content-manager/collection-types/application::project.project?page=1&pageSize=9999`;

        const fetchData = async () => {
        try {
            const { data } = await axios.get(
            url,
            headers
            );
            //const projects = data.results
            if (this.state.message === 'showStats') {
              const pivotedProjects = data.results.map(p =>  {
                return {
                  name: p.name,                
                  leader: p.leader ? p.leader.username : '-',
                  project_state: p.project_state ? p.project_state.name : '-',
                  project_scope: p.project_scope ? p.project_scope.short_name : '-',
                  project_scope_name: p.project_scope ? p.project_scope.name : '-',
                  balance: p.balance ? p.balance : 0,
                  estimated_balance: p.estimated_balance ? p.estimated_balance : 0,
                  incomes_expenses: p.incomes_expenses ? p.incomes_expenses : 0,
                  total_estimated_expenses: p.total_estimated_expenses ? p.total_estimated_expenses: 0,
                  total_estimated_hours: p.total_estimated_hours ? p.total_estimated_hours : 0,
                  total_expenses: p.total_expenses ? p.total_expenses : 0,
                  total_expenses_hours: p.total_expenses_hours ? p.total_expenses_hours : 0,
                  total_incomes: p.total_incomes ? p.total_incomes : 0,
                  total_real_hours: p.total_real_hours ? p.total_real_hours : 0,
                  count: 1
                }
              });
              const projects = data.results;
              this.setState({ isLoading: false, projects, error: false });

              return pivotedProjects;
            }
            else if (this.state.message === 'showStats2') {
              const pivotedProjects = [];
              data.results.forEach(p =>  {
                //console.log('project', p)
                if (p.dedication && p.dedication.length > 0) {
                  p.dedication.forEach(d => {                                        
                    const dedicationLine = {
                      name: p.name,                
                      leader: p.leader ? p.leader.username : '-',
                      project_state: p.project_state ? p.project_state.name : '-',
                      project_scope: p.project_scope ? p.project_scope.short_name : '-',
                      project_scope_name: p.project_scope ? p.project_scope.name : '-',
                      total_estimated_hours: p.total_estimated_hours ? p.total_estimated_hours : 0,
                      total_real_hours: p.total_real_hours ? p.total_real_hours : 0,
                      count: 1,
                      month: d.date ? moment(d.date).format('MM').toString() : 0,
                      year: d.date ? moment(d.date).format('YYYY').toString() : 0,
                      day: d.date ? moment(d.date).format('DD').toString() : 0,
                      hours: d.hours ? d.hours : 0,
                      estimated_hours: 0,
                      dedication_type: d.dedication_type ? d.dedication_type.name : '-',
                      username: d.users_permissions_user ? d.users_permissions_user.username : '-'
                    }
                    
                    pivotedProjects.push(dedicationLine)

                  });
                }
                if (p.estimated_hours && p.estimated_hours.length > 0) {
                  p.estimated_hours.forEach(d => {                                        
                    const dedicationLine = {
                      name: p.name,                
                      leader: p.leader ? p.leader.username : '-',
                      project_state: p.project_state ? p.project_state.name : '-',
                      project_scope: p.project_scope ? p.project_scope.short_name : '-',
                      project_scope_name: p.project_scope ? p.project_scope.name : '-',
                      total_estimated_hours: p.total_estimated_hours ? p.total_estimated_hours : 0,
                      total_real_hours: p.total_real_hours ? p.total_real_hours : 0,
                      count: 1,
                      month: d.month ? d.month.month_number.toString() : 0,
                      year: d.year ? d.year.year.toString() : 0,
                      day: 0,
                      hours: 0,
                      estimated_hours: d.quantity ? d.quantity : 0,
                      dedication_type: '-',
                      username: d.users_permissions_user ? d.users_permissions_user.username : '-'
                    }
                    pivotedProjects.push(dedicationLine)

                  });
                }
              });
  
              const projects = data.results;
              this.setState({ isLoading: false, projects, error: false });

              return pivotedProjects;
            }
            
        } catch (err) {
            this.setState({ isLoading: false, error: true, projects: [] });
        }
        };

        const pivotedProjects = await fetchData();
        $("#project-stats").empty();

        if (data.message === 'showStats') {
        
          var pivotgrid1 = $("#project-stats").kendoPivotGrid({
            filterable: true,
            sortable: false,
            dataSource: {     
                data: pivotedProjects,
                columns: [ { name: "project_state", expand: false }, { name: "leader", expand: false }, { name: "project_scope", expand: false } ], // Specify a dimension on columns.
                rows: [ { name: "name", expand: false }], // Specify a dimension on rows.            
                measures: ["Num", "Balanç (€)", "Hores previstes", "Hores reals"],
                schema: {
                    model: {
                        fields: {
                          project_state: { type: "string" },
                          leader: { type: "string" },
                          name: { type: "string" },
                          project_scope: { type: "string" },
                            // , format: "{0: dd-MM-yy}"
                        }
                    },
                    cube: {
                        dimensions: {
                            project_state: { caption: "Estats (TOTS)" },
                            leader: { caption: "Líders (TOTS)" },
                            name: { caption: "Projectes (TOTS)" },
                            project_scope: { caption: "Àmbits (TOTS)" },
                            
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
        });
      }
      else {
        var pivotgrid1 = $("#project-stats").kendoPivotGrid({
          filterable: true,
          sortable: false,
          dataSource: {     
              data: pivotedProjects,
              columns: [ { name: "project_state", expand: false }, { name: "leader", expand: false }, { name: "project_scope", expand: false }, { name: "year", expand: false }, { name: "month", expand: false }, { name: "day", expand: false }, { name: "username", expand: false } ], // Specify a dimension on columns.
              rows: [ { name: "name", expand: false }], // Specify a dimension on rows.            
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
        });
      }
    }
    );
  }

  componentWillUnmount() {
    eventBus.remove("showStats");
  }

  render() {
    return <div>
          <div id="configurator"></div>
          <div id="project-stats">
        </div>
      </div>
      ;
  }
}

export default Stats;