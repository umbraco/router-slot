import { css, LitElement, PropertyValues, TemplateResult, html } from 'lit';
import 'weightless/nav';
import { GLOBAL_ROUTER_EVENTS_TARGET } from '../../../lib/config';
import { sharedStyles } from '../styles';
import 'weightless/button';
import { IRoute, IRoutingInfo, PageComponent } from '../../../lib/model';
import { queryString, isPathActive, basePath, query } from '../../../lib/util';

const ROUTES: IRoute[] = [
  {
    path: 'secret',
    component: () => import('./secret/secret'),
  },
  {
    path: 'user/:user/dashboard/:dashId',
    component: () => import('./user/user'),
    setup: (page: PageComponent, info: IRoutingInfo) => {
      //page.userId = info.match.params.userId;
      console.log({ page, info });
    },
  },
  {
    path: '**',
    redirectTo: 'secret',
    preserveQuery: true,
  },
];

export default class HomeComponent extends LitElement {
  static styles = [
    sharedStyles,
    css`
      #child {
        margin: 70px 0 0 0;
        padding: 30px;
      }

      a,
      button,
      wl-button {
        margin: 0 12px 0 0;
      }
    `,
  ];

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    console.log({
      query: query(),
      queryString: queryString(),
    });

    GLOBAL_ROUTER_EVENTS_TARGET.addEventListener('changestate', () =>
      this.requestUpdate()
    );
  }

  private logout() {
    localStorage.clear();
    history.replaceState(null, '', '/login');
  }

  render(): TemplateResult {
    return html`
      <wl-nav fixed shadow>
        <h1 slot="title">router-slot</h1>
        <div slot="right">
          <a
            href="home/secret/code"
            ?data-active="${isPathActive(`${basePath()}home/secret`)}"
          >
            Go to SecretComponent
          </a>
          <a
            href="home/user/@andreasbm/dashboard/123"
            ?data-active="${isPathActive(
              `${basePath()}home/user/@andreasbm/dashboard/123`
            )}"
          >
            Go to UserComponent
          </a>
          <a
            href="home/user/@andreasbm/dashboard/123?foo=bar"
            ?data-active="${isPathActive(
              `${basePath()}home/user/@andreasbm/dashboard/123`
            )}"
          >
            Go to UserComponent (with query)
          </a>
          <wl-button @click="${() => this.logout()}" inverted flat>
            Logout
          </wl-button>
        </div>
      </wl-nav>
      <div id="child">
        <router-slot .routes="${ROUTES}"></router-slot>
      </div>
    `;
  }
}

window.customElements.define('home-component', HomeComponent);
