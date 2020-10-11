import React, { useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Segment } from 'semantic-ui-react';
import MediaQuery from "react-responsive";
//import imgs
import logo from './logo.svg';
import food1 from './food1.jpeg';
import food2 from './food2.jpeg';
import food3 from './food3.jpeg';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyMenu className="App-menu" />
      </header>
    </div>
  );
}

function MyMenu() {
  //set state for main menu
  const [curMenu, setCurMenu] = useState(null);
  //handle click (including click twice)
  const handleItemClick = (e, { name }) => (curMenu === name) ? setCurMenu(null) : setCurMenu(name);
  //menu items
  const items = [
    {
      key: 'self-introduction',
      name: 'self-introduction',
      content: '自我介紹',
      active: (curMenu === 'self-introduction'),
      onClick: handleItemClick
    },
    {
      key: 'album',
      name: 'album',
      content: '相簿',
      active: (curMenu === 'album'),
      onClick: handleItemClick
    },
    {
      key: 'announcement',
      name: 'announcement',
      content: '聲明',
      active: (curMenu === 'announcement'),
      onClick: handleItemClick
    }
  ]

  var menu = <Menu pointing items={items} />;
  var content = <MyContent curMenu={curMenu} />
  return (
    <div>
      {/* for computer */}
      <MediaQuery minDeviceWidth={1080}>
        <div style={(curMenu === null) ? null : { width: "40vw" }} >
          {menu}
          {content}
        </div>
      </MediaQuery >
      {/* for mobile device */}
      <MediaQuery maxDeviceWidth={1079}>
        <div>
          {menu}
          {content}
        </div>
      </MediaQuery >
    </div>
  )
}
//The content of main menu items
function MyContent(props) {
  var content;

  switch (props.curMenu) {
    case 'self-introduction':
      content = (
        <p style={{ color: 'black', textAlign: "left" }}>
          姓名：馮子軒<br />學號：b06901052<br />系級：電機四
        </p>); break;
    case 'album':
      content = (
        <p style={{ color: 'black', textAlign: "left" }}>
          <ImgList />
        </p>); break;
    case 'announcement':
      content = (
        <p style={{ color: 'black', textAlign: "left" }}>
          圖片取自開源圖庫Pexels。<br />樣式取自Semantic-UI。
        </p>); break;
    default:
      return null;
  }

  return (
    <Segment>
      {content}
    </Segment>
  )
}
//the img list for the album
function ImgList(props) {
  const [page, setPage] = useState("1");
  const handleItemClick = (e, { name }) => setPage(name);
  const items = [
    { key: "i1", name: '1', active: page === '1', onClick: handleItemClick },
    { key: "i2", name: '2', active: page === '2', onClick: handleItemClick },
    { key: "i3", name: '3', active: page === '3', onClick: handleItemClick }
  ];

  var imgSrc;
  switch (page) {
    case '1': imgSrc = food1; break;
    case '2': imgSrc = food2; break;
    case '3': imgSrc = food3; break;
    default: imgSrc = food1;
  }

  return (
    <div>
      <Menu borderless pointing items={items} />
      <Segment>
        <img src={imgSrc} alt='this is a img' style={{ maxWidth: "100%" }} />
      </Segment>
    </div>
  )
}

export default App;
