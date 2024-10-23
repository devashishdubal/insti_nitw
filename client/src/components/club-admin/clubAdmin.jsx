import React, { useState, useEffect, useContext } from 'react';
import './ClubAdmin.css'; // Import your CSS file
import axios from 'axios'
import { Link } from 'react-router-dom';
import './EventCard.css'
import { AuthContext } from '../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Button, ButtonGroup, Heading, Box, Flex, Spacer, SimpleGrid, VStack, HStack,Text, Grid, Center, Input , InputGroup, InputRightAddon, InputRightElement, Divider } from '@chakra-ui/react'
/*
chetankar65@gmail.com
12345678
*/

const ClubAdmin = () => {
  const [status,setStatus] = useState("member");
  const [adminSearch, setAdminSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [owner, setOwner] = useState('');
  const { currentUser, userDetails } = useContext(AuthContext);
  const [admins,setAdmins] = useState([]);
  const [members,setMembers] = useState([]);

  const setMemberDetails = async () => {
    try{
      setMembers([]);
      userDetails.club.clubMembers.forEach(async (userId) => {
        const response = await axios.get("http://localhost:8000/api/v1/users/getUserNameById/" + userId);
        setMembers((prev) => [...prev, {username:response.data,userID:userId}]);
      })
      console.log(members);
    } catch (e){
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  const setAdminDetails = async () => {
    try{
      userDetails.club.clubAdmins.forEach(async (userId) => {
        const response = await axios.get("http://localhost:8000/api/v1/users/getUserNameById/" + userId);
        setAdmins((prev) => [...prev, {username:response.data,userID:userId}]);
      })
    } catch (e) {
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }
  const handleAdminClick = async () => {
    try{
      if (status === "member"){
        toast.error('Members cannot add users!!', {
          duration: 1000,
          position: 'top-right',
          style: {marginTop: 70},
          className: '',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }

      const response = await axios.put(`http://localhost:8000/api/v1/clubs/addAdmin`,{newClubAdmin:adminSearch,clubId:userDetails.club.clubId});
      // setAdmins(response.data);
      toast.success('Admin added!', {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      setAdminSearch("");
      setAdmins((prev) => [...prev, {username:response.data.username,userID:response.data.userID}]);
    }
    catch(e) {
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  const removeAdmin = async (userId) => {
    try{
      if (status === "member"){
        toast.error('Members cannot add users!!', {
          duration: 1000,
          position: 'top-right',
          style: {marginTop: 70},
          className: '',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }


      const response = await axios.delete(`http://localhost:8000/api/v1/clubs/removeAdmin/${userDetails.club._id}/${userId}`);
      const temp = admins.filter((admin) => {return admin.userID !== userId});
      setAdmins(temp);
      toast.success('Admin deleted!', {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (e) {
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  const handleMemberClick = async () => {
    try{
      if (status === "member"){
        toast.error('Members cannot add users!!', {
          duration: 1000,
          position: 'top-right',
          style: {marginTop: 70},
          className: '',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }
      const response = await axios.put(`http://localhost:8000/api/v1/clubs/addMember`,{newClubMember:memberSearch,clubId:userDetails.club.clubId});
      toast.success('Member added!', {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      // userDetails.club.clubMembers.push(response.data.userID);
      setMemberSearch("");
      setMembers((prev) => [...prev, {username:response.data.username,userID:response.data.userID}]);
    }
    catch(e) {
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  const removeMember = async (userId) => {
    try{
      if (status === "member"){
        toast.error('Members cannot add users!!', {
          duration: 1000,
          position: 'top-right',
          style: {marginTop: 70},
          className: '',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }
      
      const response = await axios.delete(`http://localhost:8000/api/v1/clubs/removeMember/${userDetails.club._id}/${userId}`);
      const temp = members.filter((member) => {return member.userID !== userId});
      setMembers(temp);
      toast.success('Member deleted!', {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (e){
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  const [events,setEvents] = useState([]);
  const fetchClubEvents = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/v1/events/getEventDetails/club/${userDetails.club._id}`)
      const e1 = response.data.map((event,index) => ({
        id: index+1,
        card:
          <>
            <Box margin='16px'>
              <Link to={`/clubs/edit_event/${event._id}`} maxWidth="sm">
                <VStack spacing='1px' borderWidth='2px' borderColor='black' borderRadius='10px'>
                      <Text overflow='hidden'>{event.eventName}</Text>
                      <Text>{new Date(event.eventDateTime).toLocaleDateString()} • {new Date(event.eventDateTime).toLocaleTimeString()}</Text>
                      <Text>{event.eventVenue}</Text>
                </VStack>
              </Link>
            </Box>
            
          </>
      }));
      setEvents(e1);
    }
    catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    console.log(userDetails);
    setStatus(userDetails.status)
    setAdminDetails();
    setMemberDetails();
    fetchClubEvents();
  }, [])

  const logout = () => {
    window.location.href = 'http://localhost:8000/logout';
  }

  return (
    <>
        <Box p='4'>
            <Flex>
                <Heading>Club Interface</Heading>
                <Spacer />
                <Button colorScheme='teal' size='md' onClick={logout}>
                    Logout
                </Button>
            </Flex>
            <Divider mt='4'/>
            <Flex justifyContent='space-evenly' mt='4'>
                <Link to="/clubs/create_event/">
                    <Button colorScheme='teal' size='lg'>
                        + Create Event
                    </Button>
                </Link>

                <HStack>
                    <Input value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} placeholder='Add member'/>
                    <Button colorScheme='teal' width='200px' onClick={handleMemberClick}>Add Member</Button>
                </HStack>
                <HStack>
                    <Input value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} placeholder='Add admin'/>
                    <Button colorScheme='teal' width='200px' onClick={handleAdminClick}>Add Admin</Button>
                </HStack>
    
            </Flex>
        

            <Flex justifyContent='space-between' mt='4'>
                <Box width='60%'>
                    <Heading>Club Events</Heading>
                    <SimpleGrid mt='2' minChildWidth='400px' borderWidth='4px' borderColor='black' borderRadius='10px' maxHeight='xl' overflow='auto'>
                        {events.length === 0 ? (
                        <p>Loading...</p>
                        ):(
                        events.map((event) => (
                            <div key={event.id}>
                            {event.card}
                            </div>
                        )
                        ))}
                    </SimpleGrid>
                </Box>
                
                <Box width='200px'>
                    <Center>
                        <Heading>Members</Heading>
                    </Center>
                    
                    <VStack spacing='24px' mt='2'>
                        {
                            members === null ? ("members null") : (
                            members.map((member) => (
                                <HStack key={member.userID} borderWidth='1px' borderColor='black' borderRadius='10px'>
                                    <Text>{member.username}</Text>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width={20} height={20} onClick={() => removeMember(member.userID)}>
                                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                    </svg>
                                </HStack>
                            ))
                            )
                        }
                    </VStack>
                </Box>
                
                <Box width='200px'>
                    <Center>
                        <Heading>Admins</Heading>
                    </Center>
                    <VStack spacing='1px' mt='2'>
                        {
                            admins === null ? ("members null") : (
                                admins.map((admin) => (
                                <HStack key={admin.userID} borderWidth='1px' borderColor='black' borderRadius='10px'>
                                    <Text>{admin.username}</Text>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width={20} height={20} onClick={() => removeMember(admin.userID)}>
                                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                    </svg>
                                </HStack>
                            ))
                            )
                        }
                    </VStack>
                </Box>
            </Flex>
            
        </Box>
        <Toaster/>
    </>
  );
};

export default ClubAdmin;
