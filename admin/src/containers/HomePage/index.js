/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { get, upperFirst } from 'lodash';
import { auth, LoadingIndicatorPage } from 'strapi-helper-plugin';
import PageTitle from '../../components/PageTitle';
import { useModels } from '../../hooks';

import useFetch from './hooks';
import { ALink, Block, Container, LinkWrapper, P, Wave, Separator } from './components';
import BlogPost from './BlogPost';
import SocialLink from './SocialLink';
import ProjectLink from './ProjectLink';
import Stats from './Stats';

import eventBus from "./EventBus";

const FIRST_BLOCK_LINKS = [
//   {
//     link:
//       'https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html#_4-create-a-category-content-type',
//     contentId: 'app.components.BlockLink.documentation.content',
//     titleId: 'app.components.BlockLink.documentation',
//   },
//   {
//     link: 'https://github.com/strapi/foodadvisor',
//     contentId: 'app.components.BlockLink.code.content',
//     titleId: 'app.components.BlockLink.code',
//   },
];

const SOCIAL_LINKS = [
//   {
//     name: 'GitHub',
//     link: 'https://github.com/strapi/strapi/',
//   },
//   {
//     name: 'Slack',
//     link: 'https://slack.strapi.io/',
//   },
//   {
//     name: 'Medium',
//     link: 'https://medium.com/@strapi',
//   },
//   {
//     name: 'Twitter',
//     link: 'https://twitter.com/strapijs',
//   },
//   {
//     name: 'Reddit',
//     link: 'https://www.reddit.com/r/Strapi/',
//   },
//   {
//     name: 'Forum',
//     link: 'https://forum.strapi.io',
//   },
//   {
//     name: 'Academy',
//     link: 'https://academy.strapi.io',
//   },
];

const HomePage = ({ history: { push } }) => {
  
  //const { error, isLoadingProjects, projects } = useFetch();

  // Temporary until we develop the menu API
  const { collectionTypes, singleTypes, isLoading: isLoadingForModels } = useModels();

  const handleClick = e => {
    e.preventDefault();

    push(
      '/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null'
    );
  };

  const handleClickProjects = e => {
    e.preventDefault();

    push(
      '/plugins/content-manager/collectionType/application::project.project'
    );
  };

  const handleClickSocial = e => {
    e.preventDefault();

    push(
      '/plugins/content-manager/collectionType/application::social-entity.social-entity'
    );
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = contentTypes => contentTypes.filter(c => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 || filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const headerId = hasAlreadyCreatedContentTypes
    ? 'HomePage.greetings'
    : 'app.components.HomePage.welcome';
  const username = get(auth.getUserInfo(), 'firstname', '');
  const linkProjects = {
        id: 'app.components.HomePage.button.blog',
        href: '',
        onClick: handleClickProjects,
        type: 'blog',
        target: '_blank',
      };

  const linkSocial = {
      id: 'Entitats',        
      href: '',
      onClick: handleClickSocial,
      type: 'blog',
      target: '_blank',
    };
  
    const linkStats = {
      id: 'Stats',        
      href: '',
      onClick: handleClickStats,
      type: 'blog',
    };

    const linkStats2 = {
      id: 'Stats',        
      href: '',
      onClick: handleClickStats2,
      type: 'blog',
    };

    const linkStats3 = {
      id: 'Stats',        
      href: '',
      onClick: handleClickStats3,
      type: 'blog',
    };
    
    const handleClickStats = e => {
      e.preventDefault();      
      eventBus.dispatch("showStats", { message: 'showStats' });
    };

    const handleClickStats2 = e => {
      e.preventDefault();      
      eventBus.dispatch("showStats", { message: 'showStats2' });
    };

    const handleClickStats3 = e => {
      e.preventDefault();      
      eventBus.dispatch("showStats", { message: 'showStats3' });
    };

    const handleClickStats4 = e => {
      e.preventDefault();      
      eventBus.dispatch("showStats", { message: 'showStats4' });
    };
  
    let showStats = false;

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {title => <PageTitle title={title} />}
      </FormattedMessage>
      
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <Block>
              <Wave />
              <FormattedMessage
                id={headerId}
                values={{
                  name: upperFirst(username),
                }}
              >
                {msg => <h2 id="mainHeader">{msg}</h2>}
              </FormattedMessage>
              
              <br />
              <br />
              <div className="row">
                <div className="col-lg-2 col-md-3 col-xs-12">
                  <ALink
                      rel="noopener noreferrer"
                      {...linkProjects}
                      style={{ verticalAlign: ' bottom', marginBottom: 5 }}
                    >
                      Projectes
                    </ALink>                  
                </div>
                <div className="col-lg-2 col-md-3 col-xs-12">
                <ALink
                    rel="noopener noreferrer"
                    {...linkSocial}
                    style={{ verticalAlign: ' bottom', marginBottom: 5 }}
                  >
                    Entitats
                  </ALink>
                </div>
                <div className="col-lg-2 col-md-3 col-xs-12">
                  <ALink
                    rel="noopener noreferrer"
                    {...linkProjects}
                    style={{ verticalAlign: ' bottom', marginBottom: 5 }}
                    onClick={handleClickStats}
                  >
                    Estad. Projectes
                  </ALink>
                </div>
                <div className="col-lg-2 col-md-3 col-xs-12">
                  <ALink
                    rel="noopener noreferrer"
                    {...linkProjects}
                    style={{ verticalAlign: ' bottom', marginBottom: 5 }}
                    onClick={handleClickStats2}
                  >
                    Estad. Dedicació
                  </ALink>
                </div>
                <div className="col-lg-2 col-md-3 col-xs-12">
                  <ALink
                    rel="noopener noreferrer"
                    {...linkProjects}
                    style={{ verticalAlign: ' bottom', marginBottom: 5 }}
                    onClick={handleClickStats3}
                  >
                    Estad. Estratègies
                  </ALink>
                </div>
                <div className="col-lg-2 col-md-3 col-xs-12">
                  <ALink
                    rel="noopener noreferrer"
                    {...linkProjects}
                    style={{ verticalAlign: ' bottom', marginBottom: 5 }}
                    onClick={handleClickStats4}
                  >
                    Estad. Intercooperació
                  </ALink>
                </div>
              </div>
              <Separator style={{ marginTop: 37, marginBottom: 36 }} />

              <Stats />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {FIRST_BLOCK_LINKS.map((data, index) => {
                  const type = index === 0 ? 'doc' : 'code';

                  return (
                    <LinkWrapper href={data.link} target="_blank" key={data.link} type={type}>
                      <FormattedMessage id={data.titleId}>
                        {title => <p className="bold">{title}</p>}
                      </FormattedMessage>
                      <FormattedMessage id={data.contentId}>
                        {content => <p>{content}</p>}
                      </FormattedMessage>
                    </LinkWrapper>
                  );
                })}
              </div>
            </Block>
          </div>

          {/* <div className="col-md-12 col-lg-4">
            <Block style={{ paddingRight: 30, paddingBottom: 0 }}>
              <FormattedMessage id="HomePage.community">{msg => <h2>{msg}</h2>}</FormattedMessage>
              <FormattedMessage id="app.components.HomePage.community.content">
                {content => <P style={{ marginTop: 7, marginBottom: 0 }}>{content}</P>}
              </FormattedMessage>
              <FormattedMessage id="HomePage.roadmap">
                {msg => (
                  <ALink
                    rel="noopener noreferrer"
                    href="https://portal.productboard.com/strapi/1-public-roadmap/tabs/2-under-consideration"
                    target="_blank"
                  >
                    {msg}
                  </ALink>
                )}
              </FormattedMessage>

              <Separator style={{ marginTop: 18 }} />
              <div
                className="row social-wrapper"
                style={{
                  display: 'flex',
                  margin: 0,
                  marginTop: 36,
                  marginLeft: -15,
                }}
              >
                {SOCIAL_LINKS.map((value, key) => (
                  <SocialLink key={key} {...value} />
                ))}
              </div>
            </Block>
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);


// import React, { memo } from 'react';

// import { Block, Container } from './components';

// const HomePage = ({ global: { plugins }, history: { push } }) => {
//   return (
//     <>
//       <Container className="container-fluid">
//         <div className="row">
//           <div className="col-12">
//             <Block>Hello World!</Block>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default memo(HomePage);
