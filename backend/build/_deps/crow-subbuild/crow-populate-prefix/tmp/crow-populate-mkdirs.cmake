# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-src"
  "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-build"
  "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-subbuild/crow-populate-prefix"
  "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-subbuild/crow-populate-prefix/tmp"
  "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-subbuild/crow-populate-prefix/src/crow-populate-stamp"
  "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-subbuild/crow-populate-prefix/src"
  "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-subbuild/crow-populate-prefix/src/crow-populate-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-subbuild/crow-populate-prefix/src/crow-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "C:/Users/muyel/OneDrive/Documents/Uni Courses/Miscellaneous/Programming side projects/NP-Dater/backend/build/_deps/crow-subbuild/crow-populate-prefix/src/crow-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
