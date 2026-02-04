'use client'
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';

import Container from '../Container';

const mock = [
  {
    name: 'Lawerence N/A',
    title: 'N/A',
    avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
    about: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
  },
  {
    name: 'Estevan Saucedo',
    title: 'N/A',
    avatar: 'estevan.jpg',
    about: 'Estevan Saucedo is the co-founder and lead of PawParty, blending his love for animals with a passion for technology. With over a decade of experience building innovative software, he brings both creativity and leadership to the mission. Estevan is dedicated to using tech to connect people with pets in need.',
  },
  {
    name: 'Jayson Ambrose',
    title: 'N/A',
    avatar: 'jayson.jpg',
    about: 'Jayson Ambrose has attended and completed a Software Engineering bootcamp through Flatiron School in Winter-Spring 2023. Jayson is an advocate for protecting animals and the environment. He has donated time to dog shelters and vet clinics by fostering animals.',
  },
  {
    name: 'Alberto Perez',
    title: 'N/A',
    avatar: 'beto.jpg',
    about:'Alberto Perez is a graduate of California State University Fullerton with a bachelor of science in computer science. Alberto has 4 very energetic small dogs.',
  },
  {
    name: 'James McMath',
    title: 'N/A',
    avatar: 'james.png',
    about:'James McMath is an associates computer science student at the University of Arkansas at Little Rock. James is a cat owner with a lasting love for animals and a commitment to their well-being.',
  },
  {
    name: 'Becca Verna',
    title: 'N/A',
    avatar: 'becca.png',
    about:'Becca is a senior UX strategist and designer who transforms complex systems into intuitive, high-performing digital experiences. With 25 years in design and marketing, she specializes in journey-led UX strategy and evidence-based interface design that scales enterprise and e-commerce platforms.',
  },
];

const TeamProfiles = () => {
  const theme = useTheme();
  return (
    <Container>
      <Box>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
            }}
            gutterBottom
            color={'text.secondary'}
            align={'center'}
            fontWeight={700}
          >
            Our team
          </Typography>
          <Typography fontWeight={700} variant={'h4'} align={'center'}>
            Trust the professionals
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {mock.map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box
                component={Card}
                boxShadow={2}
                sx={{
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                <CardContent>
                  <Box
                    component={Avatar}
                    src={item.avatar}
                    height={100}
                    width={100}
                  />
                  <Box marginTop={4}>
                    <ListItemText primary={item.name} secondary={item.title} />
                    <Typography variant={'subtitle2'} color={'text.secondary'}>
                      {item.about}
                    </Typography>
                    <Box marginTop={4}>
                    </Box>
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TeamProfiles;
