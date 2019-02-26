const LocalStratergy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

module.exports = (passport, User) => {
    passport.use('local-signin',new LocalStratergy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, async function(req, username, password, done){
            const existingUsers = await User.findOne({username: username})
            if(!existingUsers){
                done(null,false, { sucess: false, message: 'Incorrect username'});
            }
            let res = await bcrypt.compare(password,existingUsers.password)
            if(res){
                done(null,existingUsers);
            }else{
                done(null,false,{ success: false, message: 'Incorrect password'} )
            }
            
        }
    )
    );

    passport.use('local-signup',new LocalStratergy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, async function(request, username, password, done){
            const social = request.body.social
            const checkUsernameAlreadyExists = await User.findOne({username: request.body.username});
            if(checkUsernameAlreadyExists){
                done(null,false,{success: false, message: 'Username already in use'})
            }
            const checkEmailAlreadyExists = await User.findOne({email: request.body.email});
            if(checkEmailAlreadyExists){
                 done(null,false, { sucess: false, message: 'Email already in use'});
            }
            if(social === 'Google'){
                try{
                const user = await User.findOne({'google.id': request.body.id});
                if(user){
                    done(null,false,{success: false, message: 'Account already exists'});
                }else{
                    const newUser = await new User({
                        google: {
                            id: request.body.id,
                            token: request.body.socialToken
                        },
                        email: request.body.email,
                        username: request.body.username,
                        name: request.body.name
                    })

                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(request.body.password,salt);
                    newUser.password = hash;
                    newUser.save();
                    done(null,newUser,{success: true, message: 'Account Created'});
                }
                }catch(error){
                    console.log(error);
                    done(error);
                }
            }else if (social === 'Facebook'){
                try{
                    const user = await User.findOne({'facebook.id': request.body.id});
                    if(user){
                        done(null,false,{message: 'Facebook Account already exists'});
                    }else{
                        const newUser = await new User({
                            facebook: {
                                id: request.body.id,
                                token: request.body.socialToken
                            },
                            email: request.body.email,
                            username: request.body.username,
                            name: request.body.name
                        })
    
                        const salt = await bcrypt.genSalt(10);
                        const hash = await bcrypt.hash(request.body.password,salt);
                        newUser.password = hash;
                        newUser.save();
                        done(null,newUser);
                    }
                    }catch(error){
                        console.log(error);
                        done(error);
                    }

            }else{
                const existingUser = await User.findOne({username: username})
                if(existingUser){
                    done(null,false, { message: 'Username already exists'});
                }                    
                const user = await new User();
                user.email = req.body.email;
                user.username = username;
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt);
                user.password = hash; 
                user.name = req.body.name;
                user.save();   
                done(null,user);
            }

        }
    )
    )
}