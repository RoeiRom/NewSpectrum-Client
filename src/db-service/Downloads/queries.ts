import gql from 'graphql-tag';

export default {};

export const AllDownloads = gql`
query AllDownloads {
    allDownloads {
        nodes {
          filePath
          title
        }
    }
  }  
`;
