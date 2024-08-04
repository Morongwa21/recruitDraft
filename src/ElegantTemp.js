import React from 'react';
import { Page, Text, View, StyleSheet, Document } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f4f4f4', // Light background color for contrast
  },
  section: {
    margin: 10,
    padding: 15,
    borderRadius: 8,
    border: '1px solid #e0e0e0',
    backgroundColor: '#ffffff', // White background for sections
  },
  header: {
    fontSize: 26,
    marginBottom: 10,
    color: '#ffffff', // Dark blue for headers
    borderBottom: '2px solid #003366', // Adding a bottom border
    paddingBottom: 5,
  },
  subHeader: {
    fontSize: 22,
    marginBottom: 10,
    color: '#800000', // Maroon for subheaders
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333333', // Dark grey for text
  },
  contactSection: {
    backgroundColor: '#003366', // Dark blue background for contact section
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  contactText: {
    fontSize: 14,
    color: '#ffffff', // White text for contact details
  },
});

const ElegantTemp = ({ profile }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.contactSection}>
        <Text style={styles.header}>{`${profile.firstName} ${profile.lastName}`}</Text>
        <Text style={styles.contactText}>{profile.email}</Text>
        <Text style={styles.contactText}>{profile.cellNumber}</Text>
        <Text style={styles.contactText}>{profile.location.address}</Text>
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

export default ElegantTemp;
