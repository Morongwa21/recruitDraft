// src/components/CVTemplate.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
});

const CV = ({ profile }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{profile.name}</Text>
        <Text style={styles.text}>{profile.contact.email}</Text>
        <Text style={styles.text}>{profile.contact.phone}</Text>
        <Text style={styles.text}>{profile.contact.address}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        {profile.education.map((edu, index) => (
          <View key={index}>
            <Text style={styles.text}>{edu.degree} - {edu.institution} ({edu.startDate} - {edu.endDate})</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.subHeader}>Experience</Text>
        {profile.experience.map((exp, index) => (
          <View key={index}>
            <Text style={styles.text}>{exp.title} - {exp.company} ({exp.startDate} - {exp.endDate})</Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.subHeader}>Skills</Text>
        <Text style={styles.text}>{profile.skills.join(', ')}</Text>
      </View>
    </Page>
  </Document>
);

const CVTemplate = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile.name}'s CV</h1>
      <PDFDownloadLink
        document={<CV profile={profile} />}
        fileName={`${profile.name}-CV.pdf`}
      >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download CV')}
      </PDFDownloadLink>
    </div>
  );
};

export default CV;
