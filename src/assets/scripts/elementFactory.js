/*

 */
export var elementFactory = {
  /*
   @menu: [{
   'icon':'iconName',
   'label':'label',
   'anchor':'anchor'
   }]
   */
  drawer : menu => `
     <nav class="mdl-navigation"><header>DIGITEC 2016</header>
     ${menu.map(item => `
     <a class="mdl-navigation__link" href="#"><i class="mdl-color-text--blue-grey-400 material-icons">${item.icon}</i>${item.label}</a>
     `).join('')}
     </nav>
  `,
  /*
   @speakers: [{
   'firstname':'firstname',
   'lastname':'lastname'
   }]
   */
    speakersList : speakers => `
        <ul>
        ${speakers.map(speaker => `
            <li>${speaker.firstname}, ${speaker.lastname}</li>
        `).join('')}
        </ul>
    `
}

