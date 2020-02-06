import Cookies from './js.cookie.min.mjs'

const longPressDelay = 750 // how long (ms) to press before settings open

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const boxes = []

document.addEventListener('DOMContentLoaded', () => {
  boxes.push(new Box('elof', 'md-home', 'http://www.eloflindalvsgymnasium.kungsbacka.se/', 'true', 'blue'))
  boxes.push(new Box('fronter', 'md-chevron-right', 'https://fronter.com/kungsbacka/', 'true', 'indigo'))
  boxes.push(new Box('bamba', 'md-local-restaurant', 'http://meny.dinskolmat.se/elof-lindalvs-gymnasium/', 'true', 'red'))
  boxes.push(new Box('schema', 'md-event', 'http://www.novasoftware.se/webviewer/(S(woosp355gavkls55molunc55))/design1.aspx?schoolid=29540&code=123774', 'true', 'purple'))

  boxes.push(new Box('office', 'md-cloud', 'https://www.office.com/', false, 'orange'))
  boxes.push(new Box('bibliotek', 'md-book', 'http://www.eloflindalvsgymnasium.kungsbacka.se/For-elever/Bibliotek1/', false, 'red'))
  boxes.push(new Box('skola24', 'md-access-time', 'https://kungsbacka.skola24.se/', false, 'green'))
  boxes.push(new Box('mail', 'md-email', 'https://webmail.kungsbacka.se/owa/auth/logon.aspx?replaceCurrent=1&reason=3&url=https%3a%2f%2fwebmail.kungsbacka.se%2fowa%2f', false, 'orange'))
  boxes.push(new Box('print', 'md-print', 'https://pullprint.kungsbacka.se/login.cfm?dest=index.cfm&', false, 'lightGreen'))
  boxes.push(new Box('facebook', 'md-account-box', 'https://www.facebook.com/', false, 'indigo'))
  boxes.push(new Box('wikipedia', 'md-bookmark', 'http://www.wikipedia.org/', false, 'black'))
  boxes.push(new Box('legacy', 'md-add', 'http://jumpsite.crew11.se/', false, 'pink'))

  $('.cookies').textContent = document.cookie

  $('.sliderButton').addEventListener('click', () => {
    $('.sliderIcon').classList.toggle('slide')
    $('.slider').classList.toggle('slideOut')
    $('.fader').classList.toggle('faded')
  })

  $('.fader').addEventListener('click', () => {
    $('.sliderIcon').classList.toggle('slide')
    $('.slider').classList.toggle('slideOut')
    $('.fader').classList.toggle('faded')
  })

  $$('h3').forEach(el => el.addEventListener('click', function () {
    this.classList.toggle('read')
    const text = this.textContent

    $('.' + text).classList.toggle('click')

    if ($('.' + text).classList.contains('click')) {
      $('.' + text).style.maxHeight = '1000px'
    } else {
      $('.' + text).style.maxHeight = '0'
    }
  }))

  $('.deleteCookies').addEventListener('click', () => {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    return render()
  })

  $('.useCookies').addEventListener('click', () => {
    if (Cookies.get('isSet') === 'true') {
      Cookies.set('isSet', 'false')
      window.location.reload()
    } else {
      Cookies.set('isSet', 'true')
    }

    for (let i = 0; i < boxes.length; i++) {
      Cookies.set(i + 'name', boxes[i].name)
      Cookies.set(i + 'link', boxes[i].link)
      Cookies.set(i + 'color', boxes[i].color)
      Cookies.set(i + 'icon', boxes[i].icon)
      Cookies.set(i + 'frequent', boxes[i].frequent)
    }

    return render()
  })

  render()
})

function Box (name, icon, link, frequent, color) {
  this.link = link
  this.name = name
  this.icon = icon
  this.frequent = frequent
  this.color = color
}

function findBox (name) {
  for (let i = 0; i < boxes.length; i++) {
    if (name === boxes[i].name) {
      return i
    }
  }
}

function render () {
  $('.cookies').textContent = document.cookie

  if (Cookies.get('isSet') === 'true') {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].name = Cookies.get(i + 'name')
      boxes[i].icon = Cookies.get(i + 'icon')
      boxes[i].link = Cookies.get(i + 'link')
      boxes[i].frequent = Cookies.get(i + 'frequent')
      boxes[i].color = Cookies.get(i + 'color')
    }
  }

  $('#frequent').textContent = null
  $('#less').textContent = null

  for (let i = 0; i < boxes.length; i++) {
    const html = (`
      <div data-long-press-delay=${longPressDelay} class="box ${boxes[i].color}">
        <i class="md-expand-more boxSettings"></i>
        <i class=" ${boxes[i].icon} boxIcon"></i>
        <h4>${boxes[i].name}</h4>
        <div class="options">
          <h6>Options</h6>
          <input type="text" class="name" value="${boxes[i].name}">
          <input type="text" class="link" value="${boxes[i].link}">
          <div>
            <select class="icon"></select>
            <select class="color"></select>
          </div>
          <i class="delete md-delete"></i>
          <i class="save md-check"></i>
        </div>
      </div>
    `)
    if (boxes[i].frequent === 'true') {
      $('#frequent').innerHTML += html
    } else {
      $('#less').innerHTML += html
    }
  }

  const colors = ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'black']
  for (let i = 0; i < colors.length; i++) {
    $$('.color').forEach(el => { el.innerHTML += `<option class="${colors[i]}">${colors[i]}</option>` })
  }

  const icons = ['md-favorite', 'md-home', 'md-chevron-right', 'md-chevron-left', 'md-expand-less', 'md-expand-more', 'md-local-restaurant', 'md-event', 'md-cloud', 'md-book', 'md-access-time', 'md-email', 'md-print', 'md-account-box', 'md-bookmark', 'md-add']
  for (let i = 0; i < icons.length; i++) {
    $$('.icon').forEach(el => { el.innerHTML += `<option class="${icons[i]}">${icons[i]}</option>` })
  }

  if ($('body').offsetWidth > 1320) {
    $$('.boxSettings').forEach(el => el.addEventListener('click', function () {
      this.classList.toggle('rotate')

      this.parentElement.querySelector('.options').classList.toggle('open')
    }))

    $$('.box').forEach(el => el.addEventListener('dblclick', function () {
      window.open(boxes[findBox(this.querySelector('h4').textContent)].link, '_blank')
    }))
  } else {
    $$('.box').forEach(el => el.addEventListener('click', function () {
      window.open(boxes[findBox(this.querySelector('h4').textContent)].link, '_blank')
    }))

    $$('.box').forEach(el => el.addEventListener('long-press', function () {
      this.querySelector('.options').classList.toggle('open')
    }))
  }

  $$('.delete').forEach(el => el.addEventListener('click', function () {
    boxes.splice(findBox(this.parentElement.parentElement.querySelector('h4').textContent), 1)
    render()
  }))

  $$('.save').forEach(el => el.addEventListener('click', function () {
    const x = findBox(this.parentElement.parentElement.querySelector('h4').textContent)
    boxes[x].name = this.parentElement.querySelector('.name').value
    boxes[x].link = this.parentElement.querySelector('.link').value
    boxes[x].color = this.parentElement.querySelector('div .color').value
    boxes[x].icon = this.parentElement.querySelector('div .icon').value

    Cookies.set(x + 'name', boxes[x].name)
    Cookies.set(x + 'link', boxes[x].link)
    Cookies.set(x + 'color', boxes[x].color)

    Cookies.set('isSet', 'true')
    for (let i = 0; i < boxes.length; i++) {
      Cookies.set(i + 'name', boxes[i].name)
      Cookies.set(i + 'link', boxes[i].link)
      Cookies.set(i + 'color', boxes[i].color)
      Cookies.set(i + 'icon', boxes[i].icon)
      Cookies.set(i + 'frequent', boxes[i].frequent)
    }

    render()
  }))

  function setExpire () {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      document.cookie = cookie + ';expires=Wed, 01 Jan 2070 00:00:00 GMT'
    }
  }

  setExpire()
}
