import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import {NavLink, Link} from "react-router-dom";
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './Theme'
import MenuIcon from '@material-ui/icons/Menu'
import '../stylesheet/NavBar.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import styled from 'styled-components'
import {device} from '../Layout/Device'
import MediaQuery from 'react-responsive'
import { 
    Toolbar,
    IconButton,
    Typography,
    Button,
    Icon,
    List,
    ListItem,
    ListItemText,
    Divider,
    Drawer,
    Card,
    CardContent
     } from '@material-ui/core';

const styles = (theme) =>  ({
    root: {
      width: '100%',
      color: 'white',
      boxShadow: '0 0',
      borderBottom: '0.5px solid #ccc'
    },
    grow: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1
    },
    list:{
        width: 250
    },
    menuIcon:{
        marginLeft: -12,
        marginRight: 20,
        marginTop: 10,
        [theme.breakpoints.up('sm')]:{
            display: 'none'
        }
    },
    navlinks:{
        display: 'none',
        [theme.breakpoints.up('sm')]:{
            display: 'inline-block',
            float: 'right',
        }
    },
    links:{
        margin: '0px 10px',
        '&:hover':{
        }
    },
    sectionMobile:{
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    sectionDesktop:{
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }
    }
  });

class NavBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            Notifications: true,
            openDrawer: false,
            NoSessionLinks: [],
            SessionAvaliableLinks: [],
            width: '0',
            sideNavContent: 'none',
        }
        this.removeNoticiations = this.removeNoticiations.bind(this);
        this.openDrawer = this.openDrawer.bind(this)
        this.renderContent = this.renderContent.bind(this)
        this.closeDrawer = this.closeDrawer.bind(this)
    }
    openDrawer(){
        this.setState({width: '60%', sideNavContent: 'block'})
    }
    closeDrawer(){
        this.setState({width: '0', sideNavContent: 'none'})
    }
    componentDidMount(){
        this.setState(
            {NoSessionLinks: this.addNoSessionLinks(),
            SessionAvaliableLinks: this.addSessionAvaliableLinks()}
        )
    }
    addNoSessionLinks(){
        const array = ['Shop', 'Sign In', 'Shop']
        return array
    }
    addSessionAvaliableLinks(){
        const array = ['Sell', 'My Account', 'Log out']
        return array
    }

    renderMobileNavigation(){
        const SideNavComponent = styled.div`
        height: 100%;
        width: 100%;
        display: ${this.state.sideNavContent}
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: 0.5s;
        background: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        `
        const SideNav = styled.div`
            heigt: 100%;
            width: ${this.state.width};
            background-color: white;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            overflow-x: hidden;

        `
        const Links = styled.li`
            margin: 5px 0;
            font-size: 20px;
            font-weight: bold;
            padding: 15px;
            border-bottom 1px solid black;
            cursor: pointer;
            color: black;
        `
        const MobileNav = styled.div`
            width: 100%;
            height: 50px;
            margin: 10px 0;
            border-bottom: 1px solid #ccc;
        `
        const Logo = styled.div`
            font-family: 'Raleway', sans-serif;
            font-size: 20px;
            text-decoration: none;
            display: inline-block;
            float: left;
            width: 50%;
            text-align: left;
            padding: 5px 20px;
            marign: auto;
            color: black;
            cursor: pointer;
            letter-spacing: 2px;
            :hover{
                color: #ccc;
            }
        `
        const Menu = styled.div`
            font-size: 18px;
            color: black;
            display: inline-block;
            float: left;
            padding: 5px 20px;
            width: 33.33%;
            cursor: pointer;
            letter-spacing: 2px;
            :hover{
                color: #ccc;
            }
        `
        const LinkComponent = styled.ul`
            margin: auto;
            list-style-type: none;
        `
        const CloseButton = styled.div`
            position: absolute;
            top: 0;
            right: 25px;
            bottom: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
        `

        return(
            <div>
                <SideNavComponent>
                    <SideNav>
                        <LinkComponent>
                            <Links>
                                <NavLink to={"/"} onClick={(e) => this.closeDrawer()} style={{color: 'black'}}>Shop</NavLink>
                            </Links>
                            <Links>
                                <NavLink to={"/"} onClick={(e) => this.closeDrawer()} style={{color: 'black'}}>Women</NavLink>
                            </Links>
                            <Links>
                                <NavLink to={"/"} onClick={(e) => this.closeDrawer()} style={{color: 'black'}}>Men</NavLink>
                            </Links>
                            <Links>
                                <NavLink to={"/signin"} onClick={(e) => this.closeDrawer()} style={{color: 'black'}}>Sign In</NavLink>
                            </Links>
                            <Links>
                                <NavLink to={"/signup"} onClick={(e) => this.closeDrawer()} style={{color: 'black'}}>Sign Up</NavLink>
                            </Links>
                        </LinkComponent>
                    </SideNav>
                    <CloseButton><i class="far fa-times" onClick={(e) => this.closeDrawer()}></i></CloseButton>
                </SideNavComponent>
                <MobileNav>
                    <Menu><i class="far fa-bars" onClick={(e) => this.openDrawer()}></i></Menu>
                    <Logo>
                        <NavLink to={"/"} onClick={(e) => this.closeDrawer()} style={{color: 'black'}}>No-Stylist</NavLink>
                    </Logo>
                </MobileNav>
            </div>
        )

    }

    renderContent () {
        const {classes} = this.props
        console.log(this.state)
        const nosessionlinks = ( 
            <div className={classes.list}>
                <List>
                    {this.state.NoSessionLinks.map((link) => (
                        <ListItem button key={link}>
                            <NavLink  onClick={this.closeDrawer} className={classes.links} to={"/signin"}>{link}</NavLink>
                            <Divider/>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
        const sessionavaliablelinks = (
            <div className={classes.list}>
                <List>
                    {this.state.SessionAvaliableLinks.map((link) => (
                        <ListItem button key={link}>
                            <ListItemText primary={link}/>
                            <Divider/>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
        const NavBar = styled.div`
                width: 100%;
                postion: fixed;
                top:0;
                height: 70px;
                padding: 20px;
                border-bottom: 1px solid #ccc;
                color: black;
        `
        const Links = styled.div`
                float: right;
                margin: 10px 15px;
                padding: 0 10px;
                font-weight: bold;
                cursor: pointer;
                color: black;
                transition: 0.3s;
                :hover{
                   border-bottom: 1px solid black;
                }
        `
        const Logo = styled.div`
                float: left;
                width: 33.33%;
                font-family: 'Raleway', sans-serif;
                font-size: 25px;
                text-decoration: none;
                color: black;
                cursor: pointer;
                letter-spacing: 2px;
                :hover{
                    color: #ccc;
                }
        `
        switch (this.props.auth){
            case false:
                return(
                        <NavBar>
                            <Logo>
                                <NavLink to={"/"} style={{color: 'black'}}>No-Stylist</NavLink>
                            </Logo>
                            <Links>
                                <NavLink to={"/signup"} style={{color: 'black'}}>Sign Up</NavLink>
                            </Links>
                            <Links>
                                <NavLink to={"/signin"} style={{color: 'black'}}>Sign In</NavLink>
                            </Links>
                            <Links>
                                <NavLink to={"/"} style={{color: 'black'}}>Shop</NavLink>
                            </Links>
                        </NavBar>
                    );
            case null:
                return;
            default:
            return(
                <NavBar>
                            <Logo>
                                <NavLink to={"/"} style={{color: 'black'}}>No-Stylist</NavLink>
                            </Logo>
                            <Links>
                                <a href='/api/logout' style={{color: 'black'}}>Log Out</a>
                            </Links>
                            <Links>
                                <NavLink to={"/user"} style={{color: 'black'}}>My Account</NavLink>
                            </Links>
                            <Links>
                                <NavLink to={"/sell"} style={{color: 'black'}}>Sell</NavLink>
                            </Links>
                            <Links>
                                <NavLink to={"/"} style={{color: 'black'}}>Shop</NavLink>
                            </Links>
                        </NavBar>
            );


        }
    }

 removeNoticiations(){
            window.setTimeout(
                function(){
                    this.props.removeError()
                }.bind(this)
            , 2000);
    }

    renderNotifications(){
        if(this.props.error){
            return(
                <div className="row">
                <div className="col s12">
                    <div className="notification">
                        <span className = "flow-text">
                            {this.props.error}
                            {this.removeNoticiations()}
                        </span>
                    </div>
                </div>
            </div>
            );
        }else{
            return(
                <div>
                </div>
            )
        }
    }

    
    render(){
        const CategoryComponent = styled.div`
            width: 100%;
            margi: auto;
            display: inline-block;
            border-bottom: 1px solid #ccc;
        `
        const Category = styled.div`
            width: 50%;
            display: inline-block;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            padding: 10px;
        `
        return(
            <div>

                <MediaQuery maxDeviceWidth={768}>
                    {this.renderMobileNavigation()}
                </MediaQuery>
                <MediaQuery minDeviceWidth={768}>
                    {this.renderContent()}
                    <CategoryComponent>
                        <Category>
                            Women
                        </Category>
                        <Category>
                            Men
                        </Category>
                    </CategoryComponent>
                </MediaQuery>
            </div>
        )
    }
   
}

const mapStateToProps = ( state ) => {
    return { auth: state.auth,
            error: state.error };
}
NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(connect(mapStateToProps,actions)(NavBar));