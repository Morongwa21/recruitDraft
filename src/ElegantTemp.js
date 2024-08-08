import React from 'react';
import { Page, Text, View, StyleSheet, Document, Image } from '@react-pdf/renderer';

// Helper function to format the date
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f4f4f4',
    position: 'relative',
  },
  section: {
    margin: 10,
    padding: 15,
    borderRadius: 8,
    border: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: 26,
    marginBottom: 10,
    color: '#ffffff',
    borderBottom: '2px solid #003366',
    paddingBottom: 5,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    marginBottom: 10,
    color: '#800000',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: 5,
    textDecoration: 'underline',
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333333',
  },
  contactSection: {
    backgroundColor: '#003366',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#003366',
    marginRight: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});

const ElegantTemp = ({ profile }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.contactSection}>
        <Text style={styles.header}>{`${profile.firstName} ${profile.lastName}`}</Text>
        <View style={styles.row}>
          <Image style={styles.icon} src="https://img.icons8.com/ios-filled/50/ffffff/email.png" />
          <Text style={styles.contactText}>{profile.email}</Text>
        </View>
        <View style={styles.row}>
          <Image style={styles.icon} src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" />
          <Text style={styles.contactText}>{profile.cellNumber}</Text>
        </View>
        <View style={styles.row}>
          <Image style={styles.icon} src="https://img.icons8.com/ios-filled/50/ffffff/home.png" />
          <Text style={styles.contactText}>{profile.location.address}</Text>
          <p> </p>
          <Text style={styles.contactText}>{profile.location.street}</Text>
          <p> </p>
          <Text style={styles.contactText}>{profile.location.city}</Text>
          <p> </p>
          <Text style={styles.contactText}>{profile.location.province}</Text>
          <p> </p>
          <Text style={styles.contactText}>{profile.location.zipCode}</Text>


        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        {profile.education.map((edu, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.text}>
              {edu.degree} - {edu.institution} ({formatDate(edu.startDate)} - {formatDate(edu.endDate)})
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Experience</Text>
        {profile.experience.map((exp, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.text}>
              {exp.title} - {exp.company} ({formatDate(exp.startDate)} - {formatDate(exp.endDate)})
            </Text>
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
