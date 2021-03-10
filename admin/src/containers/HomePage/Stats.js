import React, { Component } from "react";
import eventBus from "./EventBus";
import { auth } from 'strapi-helper-plugin';
import axios from 'axios';
import moment from 'moment';
import configProject  from "./ConfigStatsProject";
import configDedication  from "./ConfigStatsDedication";
import configStrategy  from "./ConfigStatsStrategy";
import configEntity  from "./ConfigStatsEntity";

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

        const compare_date = ( a, b ) => {
          const prop = 'date'
          if ( a[prop] < b[prop] ){
            return -1;
          }
          if ( a[prop] > b[prop] ){
            return 1;
          }
          return 0;
        }
                
        const token = auth.getToken()
        const headers = { headers: {'Authorization': 'Bearer ' + token }};
        const url = `${strapi.backendURL}/content-manager/collection-types/application::project.project?page=1&pageSize=9999`;

        const fetchData = async () => {
        try {
            
            if (this.state.message === 'showStats') {
              const { data } = await axios.get(
                url,
                headers
                );

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

              const { data } = await axios.get(
                url,
                headers
                );

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
                      date: d.date ? moment(d.date).format('YYYY-MM-DD').toString() : '-',
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
                      date: '-',
                      hours: 0,
                      estimated_hours: d.quantity ? d.quantity : 0,
                      dedication_type: '-',
                      username: d.users_permissions_user ? d.users_permissions_user.username : '-'
                    }
                    pivotedProjects.push(dedicationLine)

                  });
                }
              });

              //console.log('pivotedProjects', pivotedProjects)
  
              const projects = data.results;
              this.setState({ isLoading: false, projects, error: false });

              return pivotedProjects.sort( compare_date );;
            }
            else if (this.state.message === 'showStats3') {
              const pivotedProjects = [];
              const urlStrategies = `${strapi.backendURL}/content-manager/collection-types/application::strategy.strategy?page=1&pageSize=9999`;
              const urlStrategy = `${strapi.backendURL}/content-manager/collection-types/application::strategy.strategy/`;
              
              const { data } = await axios.get(
                urlStrategies,
                headers
                );

              const stategies = data.results;

              await Promise.all(stategies.map(async (e) => {
                if (e.projects && e.projects.count && e.projects.count > 0) {
                  const { data } = await axios.get(
                    urlStrategy + e.id,
                    headers
                    );
                  const strategy = data
                  strategy.projects.forEach(p => {
                    if (p.project_state === 1) {

                    }
                    const line = {
                      name: p.name,
                      total_estimated_hours: p.total_estimated_hours ? p.total_estimated_hours : 0,
                      total_real_hours: p.total_real_hours ? p.total_real_hours : 0,
                      count: 1,
                      strategy: e.code,
                      strategy_name: e.code_name
                    };
                    pivotedProjects.push(line);
                  })
                }
              }));

              //console.log('pivotedProjects', pivotedProjects)
              
              const projects = data.results;
              this.setState({ isLoading: false, projects, error: false });

              return pivotedProjects;
            }
            else if (this.state.message === 'showStats4') {
              const pivotedProjects = [];
              
              const urlEntities = `${strapi.backendURL}/content-manager/collection-types/application::social-entity.social-entity?page=1&pageSize=9999`;
              const urlEntity = `${strapi.backendURL}/content-manager/collection-types/application::social-entity.social-entity/`;

              const { data } = await axios.get(
                urlEntities,
                headers
                );

              const entities = data.results;

              await Promise.all(entities.map(async (e) => {
                if (e.projects && e.projects.count && e.projects.count > 0) {
                  const { data } = await axios.get(
                    urlEntity + e.id,
                    headers
                    );
                  const entity = data
                  entity.projects.forEach(p => {
                    if (p.project_state === 1) {

                    }
                    const line = {
                      name: p.name,
                      total_estimated_hours: p.total_estimated_hours ? p.total_estimated_hours : 0,
                      total_real_hours: p.total_real_hours ? p.total_real_hours : 0,
                      count: 1,
                      entity: e.name
                    };
                    pivotedProjects.push(line);
                  })
                }
              }));

              //console.log('pivotedProjects', pivotedProjects)
              
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
          configProject.dataSource.data = pivotedProjects;
          $("#project-stats").kendoPivotGrid(configProject);
        }
        else if (data.message === 'showStats2') {
          configDedication.dataSource.data = pivotedProjects;
          $("#project-stats").kendoPivotGrid(configDedication);        
        }
        else if (data.message === 'showStats3') {
          configStrategy.dataSource.data = pivotedProjects;
          $("#project-stats").kendoPivotGrid(configStrategy);          
        }
        else {
          configEntity.dataSource.data = pivotedProjects;
          $("#project-stats").kendoPivotGrid(configEntity);
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