import React from 'react';
import { Image } from '@chakra-ui/react';

export default function Logo({ img, boxSize }) {
  return <Image boxSize={boxSize} objectFit='contain' src={img} alt='Logo' />
}