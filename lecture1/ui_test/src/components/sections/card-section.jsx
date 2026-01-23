import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

/**
 * CardSection 컴포넌트
 * MUI Card 컴포넌트의 다양한 형태를 보여주는 섹션
 */
function CardSection() {
  const cards = [
    {
      id: 1,
      title: '기본 카드',
      description: '간단한 텍스트 콘텐츠를 담은 기본 카드입니다.',
      image: 'https://picsum.photos/seed/card1/400/200'
    },
    {
      id: 2,
      title: '미디어 카드',
      description: '이미지와 함께 콘텐츠를 표시하는 카드입니다.',
      image: 'https://picsum.photos/seed/card2/400/200'
    },
    {
      id: 3,
      title: '액션 카드',
      description: '버튼 액션이 포함된 인터랙티브 카드입니다.',
      image: 'https://picsum.photos/seed/card3/400/200'
    }
  ];

  const handleClick = (title) => {
    alert(`${title}이(가) 클릭되었습니다!`);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 600,
          fontSize: { xs: '1.25rem', md: '1.5rem' }
        }}
      >
        Card
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleClick(card.title)}>
                  자세히
                </Button>
                <Button size="small" color="secondary">
                  공유
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardSection;
