import React from 'react';
import { Page, Text, View, StyleSheet, Document, Svg, Path } from '@react-pdf/renderer';

// Helper function to format dates
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  header: {
    fontSize: 28,
    color: '#003366',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  subHeader: {
    fontSize: 18,
    color: '#800000',
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 2,
    marginLeft: 5,
  },
  bullet: {
    fontSize: 12,
    color: '#003366',
    marginRight: 5,
  },
  personalInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contactInfo: {
    marginTop: 10,
  },
  contactItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  educationSection: {
    marginBottom: 20,
  },
  experienceSection: {
    marginBottom: 20,
  },
  skillsSection: {
    marginBottom: 20,
  },
  backgroundElement: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    zIndex: -1,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

const BasicTemp = ({ profile }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.backgroundElement} />
      <View style={styles.section}>
        <View style={styles.personalInfo}>
          <Text style={styles.header}>{`${profile.firstName} ${profile.lastName}`}</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Svg height="12" width="12">
                <Path d="M0 0 L12 0 L12 12 L0 12 Z" fill="#003366" />
              </Svg>
              <Text style={styles.text}>{profile.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Svg height="12" width="12">
                <Path d="M6 0 L12 12 L0 12 Z" fill="#003366" />
              </Svg>
              <Text style={styles.text}>{profile.cellNumber}</Text>
            </View>
            <View style={styles.contactItem}>
              <Svg height="12" width="12">
                <Path d="M3 0 L9 0 L12 6 L9 12 L3 12 L0 6 Z" fill="#003366" />
              </Svg>
              <Text style={styles.text}>{profile.location.address}</Text>
            </View>
            <View style={styles.contactItem}>
              <Svg height="12" width="12">
                <Path d="M3 0 L9 0 L12 6 L9 12 L3 12 L0 6 Z" fill="#003366" />
              </Svg>
              <Text style={styles.text}>{profile.location.street}</Text>
            </View>
            <View style={styles.contactItem}>
              <Svg height="12" width="12">
                <Path d="M3 0 L9 0 L12 6 L9 12 L3 12 L0 6 Z" fill="#003366" />
              </Svg>
              <Text style={styles.text}>{profile.location.city}</Text>
            </View>
            <View style={styles.contactItem}>
              <Svg height="12" width="12">
                <Path d="M3 0 L9 0 L12 6 L9 12 L3 12 L0 6 Z" fill="#003366" />
              </Svg>
              <Text style={styles.text}>{profile.location.province}</Text>
            </View>
            <View style={styles.contactItem}>
              <Svg height="12" width="12">
                <Path d="M3 0 L9 0 L12 6 L9 12 L3 12 L0 6 Z" fill="#003366" />
              </Svg>
              <Text style={styles.text}>{profile.location.zipCode}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.section, styles.educationSection]}>
        <Text style={styles.subHeader}>Education</Text>
        {profile.education.map((edu, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>
              {edu.degree} - {edu.institution} ({formatDate(edu.startDate)} - {formatDate(edu.endDate)})
            </Text>
          </View>
        ))}
      </View>
      <View style={[styles.section, styles.experienceSection]}>
        <Text style={styles.subHeader}>Experience</Text>
        {profile.experience.map((exp, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>
              {exp.title} - {exp.company} ({formatDate(exp.startDate)} - {formatDate(exp.endDate)})
            </Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.section, styles.skillsSection]}>
        <Text style={styles.subHeader}>Skills</Text>
        <Text style={styles.text}>{profile.skills.join(', ')}</Text>
      </View>
    </Page>
  </Document>
);

export default BasicTemp;
