import React from 'react';
import { Page, Text, View, StyleSheet, Document } from '@react-pdf/renderer';

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
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
});

const BasicTemp = ({ profile }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{`${profile.firstName} ${profile.lastName}`}</Text>
        <Text style={styles.text}>{profile.email}</Text>
        <Text style={styles.text}>{profile.cellNumber}</Text>
        <Text style={styles.text}>{profile.location.address}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Education</Text>
        {profile.education.map((edu, index) => (
          <View key={index}>
            <Text style={styles.text}>{edu.degree} - {edu.institution} ({edu.startDate} - {edu.endDate})</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Experience</Text>
        {profile.experience.map((exp, index) => (
          <View key={index}>
            <Text style={styles.text}>{exp.title} - {exp.company} ({exp.startDate} - {exp.endDate})</Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Skills</Text>
        <Text style={styles.text}>{profile.skills.join(', ')}</Text>
      </View>
    </Page>
  </Document>
);

export default BasicTemp;
